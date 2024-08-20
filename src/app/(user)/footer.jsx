// import style from '../../public/bootstrap/css/footer.css';
import style from '../../../public/css/footer.css';
export default function footer() {
  return (
    <>
      <footer class="footer">
        <div class="footer-column">
          <h3>Giới thiệu</h3>
          <ul>
            <li>
              <a href="#">Về chúng tôi</a>
            </li>
            <li>
              <a href="#">Cơ hội nghề nghiệp</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#">Điều khoản sử dụng</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Chăm sóc khách hàng</h3>
          <ul>
            <li>
              <a href="#">Trung tâm hỗ trợ</a>
            </li>
            <li>
              <a href="#">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="#">Chính sách đổi trả</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Danh mục sản phẩm</h3>
          <ul>
            <li>
              <a href="#">Giày nam</a>
            </li>
            <li>
              <a href="#">Giày nữ</a>
            </li>
            <li>
              <a href="#">Giày trẻ em</a>
            </li>
            <li>
              <a href="#">Phụ kiện giày</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Liên hệ</h3>
          <p>Địa chỉ: Số 364, Đường Tô Kí,
          Quận 12, Thành phố Hồ Chí Minh</p>
          <p>Email: ntn@gmail.com</p>
          <p>Điện thoại: +84 123 456 789</p>
        </div>
      </footer>
    </>
  );
}