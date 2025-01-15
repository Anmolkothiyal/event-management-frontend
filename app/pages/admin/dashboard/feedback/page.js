import withAuth from "@/component/HOC/withAuth"

const Feedback = ()=>
{
   return(
    <div>
        <h1 className="text-center">Welcome to feedback page</h1>
    </div>
   )
}
export default withAuth(Feedback)