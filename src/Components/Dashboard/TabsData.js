import React from "react";
import VerifyImg from '../../assets/images/verify.svg'
import ProfileImg from '../../assets/images/profile.svg'
import SecondImg from '../../assets/images/second.svg'
import FirstImg from '../../assets/images/first.svg'
import ThirdImg from '../../assets/images/third.svg'

import './Dashboard.css'

export const TabsData = ({ onOpenEditModal, userData }) => {

    return (
        <>
            <div className="row mb-5">
                <div className="col-md-3 col-sm-1">
                </div>
                {userData &&
                    userData?.filter(item => item.rank == 3).map((data) => (
                        <div className="col-md-2 col-sm-3" key={data?.id}>
                            <div className='card-outer'>
                                <div className="profile-pic">
                                    <img src={ProfileImg} alt="profile-pic" />
                                </div>
                                <div className="card-content">
                                    <h3 className="mb-0 text-wrap">{data.name}<img src={VerifyImg} alt="verify" /></h3>
                                    <p className="text-wrap">{data.email}</p>
                                    <p className="text-wrap">{data.location || ''}</p>
                                    <p className="points text-wrap">
                                        <span>{data.rewardPoint}</span>points<span onClick={() => onOpenEditModal(data)} className="edit-info"><i className="fa fa-pencil" aria-hidden="true"></i></span></p>
                                </div>
                                <div className="badge">
                                    <img src={ThirdImg} alt="badge" />
                                </div>
                            </div>
                        </div>

                    ))}
                {userData &&
                    userData?.filter(item => item.rank == 1).map((data) => (
                        <div className="col-md-2 col-sm-3" key={data?.id}>
                            <div className={`card-outer ${data.rank == 1 ? 'first' : ''}`}>
                                <div className="profile-pic">
                                    <img src={ProfileImg} alt="profile-pic" />
                                </div>
                                <div className="card-content">
                                    <h3 className="mb-0 text-wrap">{data.name}<img src={VerifyImg} alt="verify" /></h3>
                                    <p className="text-wrap">{data.email}</p>
                                    <p className="text-wrap">{data.location || ''}</p>
                                    <p className="points text-wrap">
                                        <span>{data.rewardPoint}</span>points<span onClick={() => onOpenEditModal(data)} className="edit-info"><i className="fa fa-pencil" aria-hidden="true"></i></span></p>
                                </div>
                                <div className="badge">
                                    <img src={FirstImg} alt="badge" />
                                </div>
                            </div>
                        </div>

                    ))}
                {userData &&
                    userData?.filter(item => item.rank == 2).map((data) => (
                        <div className="col-md-2 col-sm-3" key={data?.id}>
                            <div className='card-outer'>
                                <div className="profile-pic">
                                    <img src={ProfileImg} alt="profile-pic" />
                                </div>
                                <div className="card-content">
                                    <h3 className="mb-0 text-wrap">{data.name}<img src={VerifyImg} alt="verify" /></h3>
                                    <p className="text-wrap">{data.email}</p>
                                    <p className="text-wrap">{data.location || ''}</p>
                                    <p className="points text-wrap">
                                        <span>{data.rewardPoint}</span>points<span onClick={() => onOpenEditModal(data)} className="edit-info"><i className="fa fa-pencil" aria-hidden="true"></i></span></p>
                                </div>
                                <div className="badge">
                                    <img src={SecondImg} alt="badge" />
                                </div>
                            </div>
                        </div>

                    ))}
                <div className="col-md-3 col-sm-1">
                </div>
            </div>
            <div className="row justify-content-center">
                {userData &&
                    userData?.slice(3)?.map((data) => (
                        <div className="col-md-2 col-sm-3 mb-5" key={data?.id}>
                            <div className="card-outer">
                                <div className="profile-pic">
                                    <img src={data.image || ProfileImg} alt="profile-pic" />
                                </div>
                                <div className="card-content">
                                    <h3 className="mb-0 text-wrap">{data.name}<img src={VerifyImg} alt="verify" /></h3>
                                    <p className="text-wrap">{data.email}</p>
                                    <p className="text-wrap">{data.location || ''}</p>
                                    <p className="points text-wrap">
                                        <span>{data.rewardPoint}</span>points<span onClick={() => onOpenEditModal(data)} className="edit-info"><i className="fa fa-pencil" aria-hidden="true"></i></span></p>
                                </div>
                                <div className="cm-badge">
                                    {data?.rank}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};
