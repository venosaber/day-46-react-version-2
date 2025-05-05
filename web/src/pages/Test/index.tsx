import {useLocation, useParams} from "react-router";

export default function () {
  console.log(useParams())
  const location = useLocation()

  console.log(location)
  return (
    <>
      <h1>Test</h1>
    </>
  )
}