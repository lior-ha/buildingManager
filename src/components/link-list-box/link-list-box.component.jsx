import LinkListItem from '../link-list-item/link-list-item.component';
import './link-list-box.styles.scss';

const LinkListBox = ({linkList, cat}) => (
    <div className="contentBox linkListBox">
        {linkList.map(({apartmentName, apartment, id, ...otherProps}, i) => (
            <LinkListItem key={`apt${i}`} id={id} param={apartment} text={apartmentName} cat={cat} {...otherProps} />
        ))}
    </div>
);

export default LinkListBox;