import {FHeader, FEditableTable} from "../../components";
import {Autocomplete, Button, Grid, TextField} from '@mui/material'
import {ChangeEvent, useEffect, useState} from "react";
import dayjs from 'dayjs';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from "@mui/material/Box";
import {Customer, Employee, getMethod, OrderDetailGet, OrderDetailPost, OrderGet, OrderPost, Product} from "../../utils";
import {useParams} from "react-router";
import {PickerValue} from "@mui/x-date-pickers/internals";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch, updateOrder, createOrder} from "../../store";

interface DetailHeader{
    name: string,
    items?: Product[],
    dropdown?: boolean,
    width?: string
}

const emptyDetailGet: OrderDetailGet = { id: null, product: {id: null, name: ''}, price: '', quantity: '', amount: '' }
const emptyDetailPost = {id: null, productId: '', price: '', quantity: '', amount: '', product: ''}

export default function() {
    const params = useParams();
    const orderId = Number(params.id);

    const dispatch: AppDispatch = useDispatch();
    const employees: Employee[] = useSelector((state: RootState) => state.employees)?.data ?? [];
    const customers: Customer[] = useSelector((state: RootState) => state.customers)?.data ?? [];
    const products: Product[] = useSelector((state: RootState) => state.products)?.data ?? [];

    const employeesStatus: boolean = useSelector((state: RootState)=> state.employees).isLoading;
    const customersStatus: boolean= useSelector((state: RootState)=> state.customers).isLoading;
    const productsStatus: boolean = useSelector((state: RootState)=> state.products).isLoading;

    const headers: DetailHeader[] = [
        { name: 'product', items: products, dropdown: true, width: '30%' },
        { name: 'quantity', width: '15%' },
        { name: 'price', width: '15%' },
        { name: 'amount', width: '15%' },
        { name: 'comment', width: '25%' },
    ];

    /***** rows of FEditTable *********/
        // order state (original type)
    const [orderGet, setOrderGet] = useState<OrderGet>({
            id: null,
            customer: { id: null, name: '' },
            employee: { id: null, name: '' },
            deliveryAddress: '',
            saleDate: '2025-05-10',
            comment: '',
            details: [{ ...emptyDetailGet }]
        })

    const [orderPost, setOrderPost] = useState<OrderPost>({
        id: null,
        customerId: '',
        saleDate: '2025-05-10',
        deliveryAddress: '',
        employeeId: '',
        comment: '',
        details: [{...emptyDetailPost}]
    });

    useEffect(() => {
        const onMounted = async () => {
            if(orderId === 0){
                setIsOrderDetailLoading(false);
                return;
            } // creating a new order => there is no detail info

            const orderData: OrderGet = await getMethod(`/orders/${orderId}`)
            setOrderGet(orderData);


            const orderDetailsPost: OrderDetailPost[] = orderData.details.map((detail: OrderDetailGet) => {
                return {
                    id: detail.id,
                    productId: detail.product.id!,
                    price: detail.price,
                    quantity: Number(detail.amount) / Number(detail.price),
                    amount: detail.amount,
                    // not for api, just for display
                    product: detail.product.name
                }
            })

            // for display
            setOrderPost({
                ...orderPost,
                customerId: Number(orderData.customer.id),
                employeeId: Number(orderData.employee.id),
                saleDate: orderData.saleDate,
                deliveryAddress: orderData.deliveryAddress,
                comment: orderData.comment,
                details: orderDetailsPost
            })

            setIsOrderDetailLoading(false);
        }

        onMounted();
    }, [orderId]);

    const onAddNewDetail = () => {
        const details: OrderDetailPost[] = [...orderPost.details];
        details.push({...emptyDetailPost});
        setOrderPost({...orderPost, details: details});
    }

    const onInput = (value: string, rowIndex: number, columnIndex: number) => {
        const details: OrderDetailPost[] = [...orderPost.details];
        const detail: OrderDetailPost = details[rowIndex];

        // if the current column name is 'product' => find product by name
        if(headers[columnIndex].name === 'product'){
            const productIdFromName = products.find(p => p.name === value)?.id ?? null;
            if(productIdFromName){
                detail.productId = productIdFromName;
            }
        }

        if(detail.quantity && detail.price){
            detail.amount = Number(detail.quantity) * Number(detail.price);
        }
    }

    const toBody = () => {
        const details = orderPost.details.map((detail: OrderDetailPost) => {
            const coreDetail = {
                productId: Number(detail.productId),
                price: Number(detail.price),
                quantity: Number(detail.quantity),
                amount: Number(detail.amount)
            }

            // create a new order => details don't have detail.id
            return orderId === 0 ? coreDetail : { ...coreDetail, id: detail.id }
        })

        return {
            customerId: Number(orderPost.customerId),
            saleDate: orderPost.saleDate,
            deliveryAddress: orderPost.deliveryAddress,
            employeeId: Number(orderPost.employeeId),
            comment: '',
            details: details
        }
    }

    const onSave = () => {
        // update
        if(orderId!==0){
            const newOrder = {...toBody(), id: orderId}
            console.log(newOrder)
            dispatch(updateOrder(newOrder))
        } // create
        else{
            const newOrder = {...toBody()}
            dispatch(createOrder(newOrder))
        }
    }

    const isLoadingDependencies: boolean = employeesStatus || customersStatus || productsStatus;
    const [isOrderDetailLoading, setIsOrderDetailLoading] = useState<boolean>(orderId !== 0);

    const isLoading: boolean = isLoadingDependencies || isOrderDetailLoading;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FHeader title={'Order Details'}/>
            <Box sx={{maxWidth: 1200, margin: 'auto'}} padding={2}>

                <h2 style={{padding: '10px'}}>New Order</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Autocomplete
                                fullWidth={true}
                                disablePortal
                                options={customers}
                                getOptionLabel={(option: Customer) => option.name || ''}
                                isOptionEqualToValue={(option: Customer, value: Customer) => option.id === value.id}
                                value={customers?.find(c => Number(c.id) === Number(orderPost.customerId))||null}
                                renderInput={
                                    (params) => <TextField {...params} label="Customer Name" />
                                }
                                onChange={(_event, newValue: Customer | null) => {

                                    setOrderPost({...orderPost, customerId: newValue?.id ?? '', deliveryAddress: newValue?.address ?? ''})
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                label="Address"
                                variant="outlined"
                                value={orderPost.deliveryAddress}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setOrderPost({...orderPost, deliveryAddress: e.target.value})}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <Autocomplete
                                fullWidth={true}
                                disablePortal
                                options={employees}
                                getOptionLabel={(option: Employee) => option.name || ''}
                                isOptionEqualToValue={(option: Employee, value: Employee) => option.id === value.id}

                                value={employees?.find((e: Employee) => Number(e.id) === Number(orderPost.employeeId))||null}
                                renderInput={
                                    (params) => <TextField {...params} label="Employee Name" />
                                }
                                onChange={(_event, newValue: Employee | null) => {

                                    setOrderPost({...orderPost, employeeId: newValue?.id ?? ''})
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <DesktopDatePicker
                                sx={{width: '100%'}}
                                defaultValue={dayjs(orderGet.saleDate, 'YYYY-MM-DD')}
                                onChange={(value: PickerValue) => setOrderPost({...orderPost, saleDate: value!.format('YYYY-MM-DD')})}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>

                <h2 style={{padding: '10px'}}>Order Details</h2>
                <Button variant={'outlined'} onClick={onAddNewDetail}>Add new detail</Button>
                <Button variant={'outlined'} onClick={onSave}>Save</Button>

                <FEditableTable columns={headers} rows={orderPost.details} onInput={onInput}/>
            </Box>
        </>
    )
}