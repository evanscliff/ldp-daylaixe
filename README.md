# DNT Group — Landing Page Bổ Túc Tay Lái

Landing page tập trung thu lead cho dịch vụ **bổ túc tay lái 1 kèm 1 tại Hà Nội**.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- HeroUI v3
- Lucide React

## Chạy local

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

## Lead form

Form đọc endpoint từ biến môi trường:

```bash
VITE_LEAD_ENDPOINT=https://your-endpoint.example/leads
```

Payload gửi dạng JSON, gồm:

- `name`
- `phone`
- `need`
- `page`
- `created_at`
- UTM parameters nếu URL có `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`

Nếu chưa cấu hình endpoint, bản demo lưu lead tạm trong `localStorage` và hướng người dùng sang Zalo. **Trước khi chạy quảng cáo cần nối endpoint thật** vào CRM, Google Sheet, n8n, Supabase hoặc backend tương ứng.

## Conversion architecture

1. Hero đánh trực tiếp pain: có bằng nhưng chưa tự tin lái.
2. Proof bar: 1:1, đường thật, 3 giờ/buổi, tại Hà Nội.
3. Pain selector giúp người dùng tự nhận diện vấn đề.
4. Method giải thích cách học theo tình huống thay vì giáo án chung.
5. Route examples biến offer thành trải nghiệm cụ thể.
6. Package selector: 3 buổi / 5 buổi / lộ trình riêng.
7. Outcome section dùng kết quả kỹ năng cụ thể, tránh claim quá mức.
8. Lead form ngắn: tên + số điện thoại + nhu cầu.
9. Mobile sticky CTA: gọi ngay / nhận lộ trình.
10. Khóa hạng B chỉ xuất hiện như secondary offer ở cuối để không làm loãng intent chính.

Chiến lược nội dung chi tiết nằm tại [`CONTENT_STRATEGY.md`](./CONTENT_STRATEGY.md).

## Việc cần chốt trước go-live

- Bảng giá hiện hành. Tài liệu nguồn đang có hai mức giá khác nhau nên UI hiện chủ động không công khai số tiền.
- Endpoint nhận lead.
- Chính sách đổi/hủy lịch.
- Phạm vi điểm đón.
- Ảnh/video thật của xe, giáo viên và buổi học.
- Review thật để bổ sung social proof.
- Pixel / GA4 / conversion tracking.

## Số liên hệ đang dùng trong giao diện

`0947 674 554`

Facebook: profile được cung cấp trong brief dự án.
