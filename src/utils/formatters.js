/**
 * Results:
 *
 * Original String Test: 'TrungQuanDev Một Lập Trình Viên'
 * Slug Result: trungquandev-mot-lap-trinh-vien
 */

export const slugify = (str) => {
  if (!str) return
  return String(str)
    .normalize('NFD')// Tách dấu Unicode (VD: "á" → "a" + "́")
    .replace(/[\u0300-\u036f]/g, '')// Xóa dấu (unicode diacritics)
    .replace(/[đĐ]/g, 'd')// Chuyển đ/Đ thành d
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')// Xóa ký tự không phải chữ/số/dấu cách/gạch ngang
    .replace(/\s+/g, '-') // Thay dấu cách thành gạch ngang
    .replace(/-+/g, '-')// Rút gọn nhiều gạch ngang thành một
    .replace(/^-+|-+$/g, '')// Xóa gạch ngang đầu/cuối
}