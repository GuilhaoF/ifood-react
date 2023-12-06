import { Head } from "../../../components/Head";
import { SnackTitle } from "../../../components/SnackTitle";
import { Snacks } from "../../../components/Snacks";
import { useSnack } from "../../../hooks/useSnack";

export default function Drinks() {
 const { drinks} = useSnack()
    return (
      <>
     
      <Head title='Drinks' description=''></Head>
      <SnackTitle>Drinks</SnackTitle>
      <Snacks snacks={ drinks}></Snacks>
      </>
    )
  }