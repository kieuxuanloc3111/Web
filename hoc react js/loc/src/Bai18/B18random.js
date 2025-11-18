function B18random(props) {
  const { user } = props;

  return (
    <div className="user-box">
      <p>- ID: {user.id}</p>
      <p>- Name: {user.name}</p>
      <p>- Username: {user.username}</p>
      <p>- Email: {user.email}</p>

      <p>- Address:</p>
      <p className="sub">+ Street: {user?.address?.street}</p>
      <p className="sub">+ Suite: {user?.address?.suite}</p>

      <p>- Phone: {user.phone}</p>
      <p>- Website: {user.website}</p>

      <p>- Company:</p>
      <p className="sub">+ Name: {user?.company?.name}</p>
      <p className="sub">+ CatchPhrase: {user?.company?.catchPhrase}</p>
    </div>
  );
}

export default B18random;
