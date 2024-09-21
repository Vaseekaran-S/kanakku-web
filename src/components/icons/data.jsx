import { FaMoneyBill1, FaMoneyBillTransfer, FaMobile } from "react-icons/fa6";
import { FaShoppingCart, FaLightbulb, FaBus, FaHandshake, FaRegMoneyBillAlt, FaHospitalAlt, FaTools, FaExclamationTriangle, FaPiggyBank, FaChartLine, FaGift, FaGraduationCap, FaBaby, FaUniversity, FaPlaneDeparture, FaMoneyCheck } from "react-icons/fa";
import { MdHome, MdOutlineHealthAndSafety, MdOutlineLocalMovies, MdRestaurantMenu, MdOutlineSportsSoccer, MdAccountBalance, MdBusinessCenter, MdSavings } from "react-icons/md";
import { AiFillShop } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { BsFuelPumpFill } from "react-icons/bs";

export const accountIcons = {
    Main: MdAccountBalance,
    Salary: FaMoneyCheck,
    Money: FaMoneyBill1,
    Bills: FaMoneyBillTransfer,
    Business: MdBusinessCenter,
    Shop: AiFillShop,
    Savings: MdSavings
}

export const expenseIcons = {
    Fixed: {
        Rent: MdHome,
        Insurance: MdOutlineHealthAndSafety,
        Loan: FaRegMoneyBillAlt,
        Recharge: FaMobile
    },
    Bills: {
        Groceries: FaShoppingCart,
        Utilities: FaLightbulb,
        Transport: FaBus,
        Cinema: MdOutlineLocalMovies,
        Fuel: BsFuelPumpFill
    },
    Discretionary: {
        Hobbies: MdOutlineSportsSoccer,
        Travel: FaPlaneDeparture,
        Luxury: GiClothes,
        DiningOut: MdRestaurantMenu,
    },
    Emergency: {
        Medical: FaHospitalAlt,
        Repairs: FaTools,
        Unplanned: FaExclamationTriangle,
    },
    Economical: {
        Savings: FaPiggyBank,
        Investment: FaChartLine,
    },
    Miscellaneous: {
        Gifts: FaGift,
        Education: FaGraduationCap,
        Childcare: FaBaby,
        BankFees: FaUniversity,
    }
};

export const incomeIcons = {
    Salary: {
        Main: MdAccountBalance,
        Salary: FaMoneyCheck,
        Bonus: FaRegMoneyBillAlt
    },
    Business: {
        BusinessIncome: MdBusinessCenter,
        Freelance: FaHandshake
    },
    Investments: {
        Dividends: MdSavings,
        RentalIncome: FaMoneyBill1,
        Interest: FaPiggyBank
    },
    Miscellaneous: {
        Other: FaRegMoneyBillAlt
    }
};

expenseIcons.All = Object.assign({}, ...Object.values(expenseIcons).map(values => values));


export const transactionIcons = {
    ...Object.assign({}, ...Object.values(incomeIcons).map(values => values)),
    ...Object.assign({}, ...Object.values(expenseIcons).map(values => values))
}