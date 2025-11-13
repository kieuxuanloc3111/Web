import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

// function Login() {
//   const [isToggle, setIsToggle] = useState(false);

//   function handleLoginClick() {
//     setIsToggle(!isToggle);
//   }
//   function handleLogoutClick() {
//     setIsToggle(!isToggle);
//   }

//   function renderButton() {
//     if (isToggle) {
//       return <LogoutButton onClick={handleLogoutClick} />;
//     } else {
//       return <LoginButton onClick={handleLoginClick} />;
//     }
//   }

//   function renderMessage() {
//     if (isToggle) {
//       return <h2 style={{ color: 'green' }}>Bạn đã đăng nhập</h2>;
//     } else {
//       return <h2 style={{ color: 'red' }}>Bạn chưa đăng nhập</h2>;
//     }
//   }

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       {renderButton()}
//       {renderMessage()}
//     </div>
//   );
// }

// export default Login;


// Component hiển thị cảnh báo
function Warning(props) {
  if (!props.warning) {
    return null; // nếu warning = false thì không hiện gì
  }

  return (
    <div style={{ color: "red", marginTop: "20px" }}>
      ⚠️ Warning! {props.children}
    </div>
  );
}

function Login() {
  const [isToggle, setIsToggle] = useState(false);

  // Khi bấm "Đăng nhập"
  function handleLoginClick() {
    setIsToggle(true);
  }

  // Khi bấm "Đăng xuất"
  function handleLogoutClick() {
    setIsToggle(false);
  }

  // Hiển thị nút phù hợp
  function renderButton() {
    if (isToggle) {
      // Đang đăng nhập → hiển thị nút Đăng xuất
      return <LogoutButton onClick={handleLogoutClick} />;
    } else {
      // Chưa đăng nhập → hiển thị nút Đăng nhập
      return <LoginButton onClick={handleLoginClick} />;
    }
  }

  // Hiển thị thông báo trạng thái
  function renderMessage() {
    if (isToggle) {
      return <h2 style={{ color: "green" }}>✅ Bạn đã đăng nhập</h2>;
    } else {
      return <h2 style={{ color: "red" }}>❌ Bạn chưa đăng nhập</h2>;
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {renderButton()}
      {renderMessage()}

      {/* Hiển thị cảnh báo nếu chưa đăng nhập */}
      <Warning warning={!isToggle}>
        Vui lòng đăng nhập để tiếp tục.
      </Warning>
    </div>
  );
}

export default Login;