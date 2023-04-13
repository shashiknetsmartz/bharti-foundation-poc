import React from 'react'
import './Breadcrumb.css';

export const Breadcrumb = () => {
    return (
        <section className="breadcrumb-bg p-23">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="breadcrumb-list">
                            <p className="mb-0">{`Home > `}<span>Leaderboard</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
