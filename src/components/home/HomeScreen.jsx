import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { threadStartLoading } from '../../actions/thread';
import { HomeCard } from './HomeCard';

export const HomeScreen = () => {

    const dispatch = useDispatch();
    const { threads, activeThread } = useSelector(state => state.thread);

    useEffect(() => {
        dispatch(threadStartLoading());
    }, [dispatch]);



  
    return (
        // <div className="container-fluid">
        //     <div className="card-group">
        //         {
        //             threads.map(t => (
        //                 <HomeCard key={ t._id } {...t}>
        //                 </HomeCard>
        //             ))
        //         }
        //     </div>
        // </div>
        <div className="row no-gutters bg-dark"  id="galeria">
                 {
                     threads.map(t => (
                         <HomeCard key={ t._id } {...t}>
                         </HomeCard>
                     ))
                 }
        </div>
    )
}
