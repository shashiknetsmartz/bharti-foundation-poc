import React from 'react'
import BannerImg from '../../assets/images/banner.png'

export const Banner = () => {
    return (
        <section className="-leaderboard-banner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="banner-inner">
                            <a href="#"><img className="w-100" src={BannerImg} alt="banner"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
