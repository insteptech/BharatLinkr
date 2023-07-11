import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonHead from '../common-components/UserHead/CommonHead'
import { userRoles } from '../../utils/helper'
import AdminLayout from './AdminLayout'
import UserLayout from '../userLayout'
import { useRouter } from 'next/router'
import { getRole, getTokenDecode, isUserLogined } from '../utils'
import { getUserDetailsById } from '../../redux/actions/user/userActions'
import { setLayoutByRole, setLoginStatus } from '../../redux/reducers/User/userSlice'
import { NextResponse } from 'next/server'

export default function Wrapper({ children, responseData }) {
    const router = useRouter();
    const layoutByRole = useSelector(state => state.userSlice.layoutByRole)
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchLayout() {
            const response = await fetch('https://bharat-linkr.vercel.app/layout');
            // const response = await fetch('http://localhost:3000/layout');
            const data = await response.json();
            dispatch(setLayoutByRole(data.role))
            if (!router.pathname.startsWith('/admin') && data.role === userRoles.admin) {
                router.push('/admin/dashboard')
            }
        }
        fetchLayout();
    }, []);
    return (
        <div>
            {['/forget', '/signup', '/login'].includes(router.pathname) ? children :
                layoutByRole ? layoutByRole === userRoles.admin ?
                    <AdminLayout> {children} </AdminLayout>
                    :
                    <UserLayout> {children} </UserLayout>
                    : ""
            }
        </div>
    )
}