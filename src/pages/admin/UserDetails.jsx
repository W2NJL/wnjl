import React, { useEffect } from 'react'
import { useActionData, useLoaderData, useLocation, useRevalidator } from 'react-router'
import { Form, useFetcher } from 'react-router-dom';

export default function UserDetails(props) {

    const loaderData = useLoaderData();

    const location = useLocation();
    const fetcher = useFetcher();

    const revalidator = useRevalidator();

    useEffect(() => {
        setTimeout(() => {
            //fetcher.load('/admin/manage/user/1');
        //     fetcher.load(location.pathname);

        //     fetcher.submit({hey: 'dummy'}, {
        //         method: 'post',
        //         action: location.pathname,
        //     })
        revalidator.revalidate();
        }, 2000);
     
    }, [])

    const actionData = useActionData();

    console.log(actionData);

    console.log({loaderData});

  return (
    <div>
      UserrDetails 

      <fetcher.Form action='/admin/manage/user/1' method ='post'>
        <input type='text' name='email' className='m-5 bg-light-900'/>

        {actionData?.errors && (<span className='text-red-400'>{actionData.errors}</span>)}
      </fetcher.Form>
    </div>
  )
}
