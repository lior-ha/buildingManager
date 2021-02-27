import LinkListBox from '../link-list-box/link-list-box.component';

const linkList = [
    {key: 1, text: "ינואר", param: `jan`, status: 'paid'},
    {key: 2, text: "פברואר", param: 'feb', status: 'paid'},
    {key: 3, text: "מרץ", param: 'mar', status: 'paid'},
    {key: 4, text: "אפריל", param: 'apr', status: 'debt'},
    {key: 5, text: "מאי", param: 'may', status: 'paid'},
    {key: 6, text: "יוני", param: 'jun', status: 'paid'},
    {key: 7, text: "יולי", param: 'jul', status: 'paid'},
    {key: 8, text: "אוגוסט", param: 'aug', status: 'debt'},
    {key: 9, text: "ספטמבר", param: 'sep', status: null},
    {key: 10, text: "אוקטובר", param: 'oct', status: null},
    {key: 11, text: "נובמבר", param: 'nov', status: null},
    {key: 12, text: "דצמבר", param: 'dec', status: null}
]

const MonthlyPaymentBox = () => {
    return (
        <div className="contentBox infoBox">
            <p className="genTitle">תשלומים - 2020</p>
            {/* <div className="paymentDetails paid">
                <p>סכום: 225 &#8362;</p>
                <p>אמצעי תשלום: מזומן</p>
                <p>תאריך תשלום: 01.10.20</p>
            </div> */}
            <LinkListBox linkList={linkList} cat={'#'} />
        </div>
    )
};

export default MonthlyPaymentBox;