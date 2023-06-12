import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`; // 소수점 이하 2자리까지 표시 


    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm />
        </div>
    </li>
};

export default MealItem;