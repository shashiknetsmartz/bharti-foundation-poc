import React from 'react';
import Logo from '../../assets/images/logo.svg'
import CoursesImg from '../../assets/images/courses.svg'
import PodcastImg from '../../assets/images/podcast.svg'
import ContestImg from '../../assets/images/contest.svg'
import SuccessImg from '../../assets/images/success.svg'
import NewsImg from '../../assets/images/news.svg'
import ForumImg from '../../assets/images/forum.svg'
import ResourcesImg from '../../assets/images/resources.svg'
import LeaderboardImg from '../../assets/images/leaderboard.svg'
import NotificationImg from '../../assets/images/notification.svg'
import AvatarImg from '../../assets/images/avatar.svg'

import './Header.css';

export const Header = () => {
    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                        <a className="navbar-brand" href="#"><img src={Logo} alt="logo"/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#"><img className="pe-10" src={CoursesImg} alt="courses" />Courses</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><img className="pe-10" src={PodcastImg} alt="Podcast" />Podcasts</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><img className="pe-10" src={ContestImg} alt="Contest" />Contests</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><img className="pe-10" src={SuccessImg} alt="Success stories" />Success stories</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><img className="pe-10" src={NewsImg} alt="News" />News</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><img className="pe-10" src={ForumImg} alt="Forums" />Forums</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><img className="pe-10" src={ResourcesImg} alt="Resources" />Resources</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#"><img className="pe-10" src={LeaderboardImg} alt="Leaderboard" />Leaderboard</a>
                                </li>
                            </ul>
                            <ul className="ms-auto mb-0 ps-0 d-flex align-items-center">
                                <li className="nav-item dropdown list-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="level-dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Level
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">National Level</a></li>
                                        <li><a className="dropdown-item" href="#">State Level</a></li>
                                        <li><a className="dropdown-item" href="#">District Level</a></li>
                                        <li><a className="dropdown-item" href="#">School Level</a></li>
                                    </ul>
                                </li>
                                <li className="notification list-none position-relative ps-4">
                                    <img src={NotificationImg} alt="notification" />
                                    <div className="sup-text">
                                        2
                                    </div>
                                </li>
                                <li className="notification list-none position-relative ps-4">
                                    <img src={AvatarImg} alt="notification" />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
