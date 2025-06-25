import {FTable, FHeader, SearchBar} from '../../components'
import {Header, OrderGet} from '../../utils'
import {Box} from "@mui/material";
import {useCallback, useMemo, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {deleteOrder, getOrders} from '../../store'
import type {RootState, AppDispatch} from '../../store'
import {useNavigate} from "react-router";

const headers: Header[] = [
    {name: 'id', text: 'ID'},
    {name: 'customer_name', text: 'Customer Name'},
    {name: 'employee_name', text: 'Employee Name'},
    {name: 'deliveryAddress', text: 'Delivery Address'},
    {name: 'saleDate', text: 'Sale Date'},
    {name: 'action', text: ''}
]

export default () => {
    const navigate = useNavigate();

    const {data: orders, isLoading} = useSelector((state: RootState) => state.orders);

    const dispatch: AppDispatch = useDispatch();

    const onAdd = useCallback(() => {
        navigate(`/order/0`)
    }, [navigate])

    const onUpdate = useCallback((id: number) => {
        navigate(`/order/${id}`)
    }, [navigate])

    const onDelete = useCallback(async (id: number) => {
        await dispatch(deleteOrder(id))
    }, [dispatch])

    const tableRows = useMemo(() => {
        if (!orders || orders.length === 0) {
            return [];
        }

        return orders.map((order: OrderGet) => {
                const customer_name: string = order?.customer?.name || 'N/A';
                const employee_name: string = order?.employee?.name || 'N/A';
                return {
                    ...order,
                    customer_name,
                    employee_name
                }
            }
        )
    }, [orders]);

    useEffect(() => {
        const onMounted = async() => {
            await dispatch(getOrders());
        }
        onMounted();
    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <FHeader title={'Orders'}/>
            <Box className={'container'}>
                <SearchBar onAdd={onAdd}/>

                <FTable
                    headers={headers}
                    rows={tableRows}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />

            </Box>
        </>
    )
}
