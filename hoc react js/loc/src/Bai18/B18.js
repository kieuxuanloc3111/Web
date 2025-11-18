
import "./B18.css"; 

function B18(props) {
  const { users } = props;

  function renderUsers() {
    return users.map((item, index) => {
      return (
        <li key={index} className="user-item">
          <p>- ID: {item.id}</p>
          <p>- Name: {item.name}</p>
          <p>- Username: {item.username}</p>
          <p>- Email: {item.email}</p>

          <p>- Address:</p>
          <p className="sub">+ Street: {item?.address?.street}</p>
          <p className="sub">+ Suite: {item?.address?.suite}</p>

          <p>- Phone: {item.phone}</p>
          <p>- Website: {item.website}</p>

          <p>- Company:</p>
          <p className="sub">+ Name: {item?.company?.name}</p>
          <p className="sub">+ CatchPhrase: {item?.company?.catchPhrase}</p>
        </li>
      );
    });
  }

  return <ul className="user-list">{renderUsers()}</ul>;
}

export default B18;
