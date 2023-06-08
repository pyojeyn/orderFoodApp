import { Fragment } from "react";

// 로컬에 있는 이미지 import 하는 법
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>JennyBooMeals</h1>
            <HeaderCartButton />
        </header>
        <div className={classes['main-image']}>
            {/* 어떤 서버에 있는 이미지라면 그 이미지에 대한 URL 을 쓰면 됨 */}
            <img src={mealsImage} alt="A table full of delicous food!"/>
        </div>
    </Fragment>
};

export default Header;