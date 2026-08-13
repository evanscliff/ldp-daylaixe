import { useMemo, useState } from "react";
import { Accordion, Button, Card, Input } from "@heroui/react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Gauge,
  GraduationCap,
  Headphones,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  SteeringWheel,
  Target,
  TrafficCone,
  X,
  Zap,
} from "lucide-react";

const PHONE = "0947674554";
const PHONE_DISPLAY = "0947 674 554";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61568260970345";
const ZALO_URL = `https://zalo.me/${PHONE}`;

const painPoints = [
  {
    icon: TrafficCone,
    title: "Ngại phố đông",
    text: "Xe máy cắt mặt, giao lộ dày và nhịp giao thông khiến bạn dễ cuống.",
    value: "Phố đông / giao lộ",
  },
  {
    icon: SteeringWheel,
    title: "Sợ ngõ nhỏ & đường hẹp",
    text: "Chưa chắc cách căn thân xe, tránh xe ngược chiều và xử lý điểm mù.",
    value: "Ngõ nhỏ / đường hẹp",
  },
  {
    icon: CarFront,
    title: "Chưa tự tin ghép xe",
    text: "Ghép dọc, ghép ngang, lùi chuồng vẫn phụ thuộc nhiều vào cảm giác.",
    value: "Ghép xe / lùi xe",
  },
  {
    icon: Gauge,
    title: "Ngại cao tốc & đường dài",
    text: "Vào làn, chuyển làn, giữ khoảng cách và tốc độ vẫn còn áp lực.",
    value: "Cao tốc / đường dài",
  },
  {
    icon: Clock3,
    title: "Lâu không cầm lái",
    text: "Có bằng nhưng phản xạ và cảm giác vô-lăng đã giảm sau thời gian dài.",
    value: "Lâu không lái",
  },
  {
    icon: Route,
    title: "Cần luyện đúng đường hằng ngày",
    text: "Đi làm, đưa đón con, đi sân bay hoặc tuyến ngoại thành thường xuyên.",
    value: "Cung đường riêng",
  },
];

const steps = [
  {
    no: "01",
    title: "Đánh giá nhanh",
    text: "Xác định kinh nghiệm, lỗi đang gặp, loại đường thường đi và mục tiêu cần đạt.",
  },
  {
    no: "02",
    title: "Chọn đúng tình huống",
    text: "Ưu tiên kỹ năng cần cải thiện thay vì học lại một giáo án giống nhau cho mọi người.",
  },
  {
    no: "03",
    title: "Lái trực tiếp",
    text: "Học viên cầm lái trên đường thực tế, giáo viên kèm 1:1 và sửa thao tác ngay tại chỗ.",
  },
  {
    no: "04",
    title: "Tăng dần độ khó",
    text: "Từ thao tác nền tảng đến phố đông, ngõ nhỏ, giờ cao điểm, cao tốc hoặc đường dài.",
  },
  {
    no: "05",
    title: "Chốt kỹ năng tự lái",
    text: "Biết rõ phần nào đã ổn, phần nào cần luyện thêm trước khi tự xử lý một mình.",
  },
];

const packages = [
  {
    id: "3-buoi",
    label: "Gói nâng cao",
    title: "3 buổi",
    meta: "3 giờ / buổi",
    description: "Phù hợp khi bạn đã có kỹ năng cơ bản và muốn xử lý tốt hơn những tình huống khó.",
    features: ["1 kèm 1", "Đường thực tế", "Chọn trọng tâm cần luyện", "Có thể ưu tiên cao tốc / phố đông"],
  },
  {
    id: "5-buoi",
    label: "Được đề xuất",
    title: "5 buổi",
    meta: "3 giờ / buổi",
    description: "Dành cho người mới có bằng, lâu không lái hoặc muốn ôn từ nền tảng đến thực tế.",
    features: ["1 kèm 1", "Ôn nền tảng", "Phố đông & ngõ nhỏ", "Tăng dần đến tình huống nâng cao"],
    featured: true,
  },
  {
    id: "lo-trinh-rieng",
    label: "Cá nhân hóa",
    title: "Lộ trình riêng",
    meta: "Theo nhu cầu",
    description: "Cho mục tiêu đặc thù: cung đường đi làm, sân bay, đường dài, ngoại thành hoặc lịch cá nhân.",
    features: ["Chọn cung đường", "Chọn kỹ năng", "Trao đổi lịch học", "Nhận báo giá theo lộ trình"],
  },
];

const routes = [
  {
    tag: "Phố & giao cắt",
    icon: TrafficCone,
    title: "Luyện nhịp giao thông thực tế",
    route: "Quan Nhân · Khương Trung · Hoàng Mai · Khâm Thiên",
    text: "Tập quan sát, chuyển hướng, xử lý giao cắt, xe cắt mặt và không gian đường hẹp.",
  },
  {
    tag: "Đường thoáng & ghép xe",
    icon: Navigation,
    title: "Lấy lại cảm giác vô-lăng",
    route: "Hồ Tây · Trích Sài · Lạc Long Quân · Nguyễn Hoàng",
    text: "Luyện kiểm soát xe, chuyển làn, quan sát biển báo và ghép xe trong tình huống thực tế.",
  },
  {
    tag: "Cao tốc / ngoại thành",
    icon: Gauge,
    title: "Nâng phản xạ ở tốc độ cao hơn",
    route: "Đại Lải · Tam Đảo · Hòa Bình (tham khảo)",
    text: "Tập vào/ra làn, giữ khoảng cách, cua dốc và xử lý đường dài theo mục tiêu học viên.",
  },
];

const faqs = [
  {
    q: "Tôi có bằng nhưng gần như quên hết, nên chọn gói nào?",
    a: "Gói 5 buổi phù hợp hơn nếu bạn cần ôn lại từ nền tảng rồi tăng dần lên đường thực tế. Trước khi chốt, DNT vẫn nên đánh giá nhanh kỹ năng hiện tại để tránh học thừa hoặc thiếu.",
  },
  {
    q: "Tôi chỉ muốn luyện ghép xe hoặc một cung đường cụ thể được không?",
    a: "Có thể đăng ký theo mục tiêu cụ thể. Hãy ghi rõ tình huống bạn muốn luyện và tuyến đường thường dùng; tư vấn viên sẽ đề xuất lộ trình phù hợp trước khi xác nhận lịch.",
  },
  {
    q: "Chưa có bằng lái thì có đăng ký bổ túc tay lái được không?",
    a: "Landing page này dành cho người đã có bằng. Nếu chưa có bằng, DNT có nhóm khóa đào tạo hạng B riêng; hãy để lại thông tin để được tư vấn đúng chương trình.",
  },
  {
    q: "Giá gói 3 buổi và 5 buổi là bao nhiêu?",
    a: "DNT đang có nhiều tài liệu giá ở các thời điểm khác nhau, vì vậy bản landing page chưa niêm yết giá cho đến khi bảng giá hiện hành được xác nhận. Bạn có thể để lại số điện thoại để nhận đúng báo giá đang áp dụng.",
  },
  {
    q: "Cung đường học có cố định không?",
    a: "Các cung đường trên trang là lộ trình tham khảo. Tuyến thực tế có thể điều chỉnh theo điểm đón, tình trạng giao thông, kỹ năng hiện tại và mục tiêu của học viên.",
  },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo() {
  return (
    <button className="brand" type="button" onClick={() => scrollToId("top")} aria-label="Về đầu trang">
      <span className="brand-mark"><CarFront size={21} strokeWidth={2.3} /></span>
      <span className="brand-copy">
        <strong>DNT</strong>
        <small>DRIVING</small>
      </span>
    </button>
  );
}

function SectionEyebrow({ children }) {
  return <div className="section-eyebrow"><span />{children}</div>;
}

function RouteVisual() {
  return (
    <div className="route-visual" aria-hidden="true">
      <div className="route-map-grid" />
      <div className="route-halo route-halo-a" />
      <div className="route-halo route-halo-b" />
      <svg className="route-svg" viewBox="0 0 620 520" fill="none">
        <path
          d="M55 425C107 383 122 324 188 300C247 279 270 334 330 297C387 262 361 202 430 171C483 147 528 169 575 94"
          stroke="rgba(87,229,209,.18)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <path
          d="M55 425C107 383 122 324 188 300C247 279 270 334 330 297C387 262 361 202 430 171C483 147 528 169 575 94"
          stroke="#57E5D1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 12"
        />
        <circle cx="55" cy="425" r="10" fill="#57E5D1" />
        <circle cx="575" cy="94" r="10" fill="#ffffff" />
      </svg>
      <div className="route-pin route-pin-a"><MapPin size={15} /> Phố đông</div>
      <div className="route-pin route-pin-b"><SteeringWheel size={15} /> Ghép xe</div>
      <div className="route-pin route-pin-c"><Gauge size={15} /> Cao tốc</div>
      <div className="dashboard-card">
        <div className="dashboard-topline">
          <div>
            <small>LỘ TRÌNH HỌC</small>
            <strong>Theo đúng điểm bạn đang yếu</strong>
          </div>
          <span className="live-dot"><i /> 1:1</span>
        </div>
        <div className="dashboard-progress">
          <span className="active" />
          <span className="active" />
          <span className="active" />
          <span />
          <span />
        </div>
        <div className="dashboard-stats">
          <div><strong>3h</strong><small>/ buổi</small></div>
          <div><strong>Hà Nội</strong><small>đường thật</small></div>
          <div><strong>1:1</strong><small>giáo viên</small></div>
        </div>
      </div>
    </div>
  );
}

function MiniLeadForm({ initialNeed = "", compact = false }) {
  const [form, setForm] = useState({ name: "", phone: "", need: initialNeed });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].reduce((acc, key) => {
      if (params.get(key)) acc[key] = params.get(key);
      return acc;
    }, {});
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^0\d{8,10}$/.test(form.phone.replace(/\s/g, ""))) {
      setStatus("error");
      setMessage("Vui lòng nhập tên và số điện thoại hợp lệ.");
      return;
    }

    const payload = {
      ...form,
      phone: form.phone.replace(/\s/g, ""),
      page: "bo-tuc-tay-lai",
      created_at: new Date().toISOString(),
      ...utm,
    };

    setStatus("loading");
    setMessage("");

    try {
      const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Lead endpoint returned an error");
        setStatus("success");
        setMessage("Đã gửi thông tin. DNT sẽ liên hệ lại để tư vấn lộ trình phù hợp.");
        setForm({ name: "", phone: "", need: initialNeed });
      } else {
        localStorage.setItem("dnt_pending_lead", JSON.stringify(payload));
        setStatus("fallback");
        setMessage("Bản demo chưa nối CRM. Thông tin đã được lưu tạm; bạn có thể nhắn Zalo để được tư vấn ngay.");
      }
    } catch {
      setStatus("error");
      setMessage("Chưa gửi được form. Bạn có thể gọi hoặc nhắn Zalo để được hỗ trợ ngay.");
    }
  };

  return (
    <form className={`lead-form ${compact ? "lead-form-compact" : ""}`} onSubmit={submit}>
      <div className="field-grid">
        <label>
          <span>Họ tên</span>
          <Input
            fullWidth
            aria-label="Họ tên"
            autoComplete="name"
            placeholder="Ví dụ: Anh Minh"
            value={form.name}
            onChange={(e) => setForm((old) => ({ ...old, name: e.target.value }))}
          />
        </label>
        <label>
          <span>Số điện thoại</span>
          <Input
            fullWidth
            aria-label="Số điện thoại"
            inputMode="tel"
            autoComplete="tel"
            placeholder="09xx xxx xxx"
            value={form.phone}
            onChange={(e) => setForm((old) => ({ ...old, phone: e.target.value }))}
          />
        </label>
      </div>
      <label>
        <span>Bạn muốn luyện gì nhất?</span>
        <div className="need-options">
          {["Phố đông", "Ngõ hẹp", "Ghép xe", "Cao tốc", "Lâu không lái", "Cung đường riêng"].map((item) => (
            <button
              type="button"
              key={item}
              className={form.need === item ? "selected" : ""}
              onClick={() => setForm((old) => ({ ...old, need: item }))}
            >
              {item}
            </button>
          ))}
        </div>
      </label>
      <Button
        type="submit"
        size="lg"
        variant="primary"
        fullWidth
        isPending={status === "loading"}
        className="primary-button lead-submit"
      >
        {status === "loading" ? "Đang gửi..." : "Nhận lộ trình học phù hợp"}
        <ArrowRight size={18} />
      </Button>
      <div className="form-footnote">
        <ShieldCheck size={15} />
        <span>Không cần email · Chỉ dùng thông tin để tư vấn khóa học</span>
      </div>
      {message && (
        <div className={`form-message ${status}`}>
          {status === "success" ? <CircleCheck size={18} /> : <MessageCircle size={18} />}
          <span>{message}</span>
          {status === "fallback" && (
            <a href={ZALO_URL} target="_blank" rel="noreferrer">Mở Zalo</a>
          )}
        </div>
      )}
    </form>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");

  const chooseNeed = (need) => {
    setSelectedNeed(need);
    setTimeout(() => scrollToId("lead"), 50);
  };

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            <button onClick={() => scrollToId("pain")}>Bạn cần luyện gì?</button>
            <button onClick={() => scrollToId("method")}>Cách học</button>
            <button onClick={() => scrollToId("packages")}>Gói học</button>
            <button onClick={() => scrollToId("faq")}>FAQ</button>
          </nav>
          <div className="header-actions">
            <a className="phone-link" href={`tel:${PHONE}`}><Phone size={16} />{PHONE_DISPLAY}</a>
            <Button size="sm" variant="primary" className="primary-button header-cta" onPress={() => scrollToId("lead")}>Nhận tư vấn</Button>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((v) => !v)} aria-label="Mở menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <button onClick={() => { scrollToId("pain"); setMobileOpen(false); }}>Bạn cần luyện gì?</button>
            <button onClick={() => { scrollToId("method"); setMobileOpen(false); }}>Cách học</button>
            <button onClick={() => { scrollToId("packages"); setMobileOpen(false); }}>Gói học</button>
            <button onClick={() => { scrollToId("faq"); setMobileOpen(false); }}>Câu hỏi thường gặp</button>
          </div>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-noise" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow"><span><Sparkles size={14} /></span>BỔ TÚC TAY LÁI 1 KÈM 1 · HÀ NỘI</div>
              <h1>Đã có bằng.<br /><em>Nhưng vẫn ngại cầm lái?</em></h1>
              <p className="hero-lead">
                Chuyển từ “biết lái” sang <strong>tự xử lý được trên đường thật</strong> — luyện 1 kèm 1 từ phố đông, ngõ nhỏ, ghép xe đến cao tốc và cung đường bạn đi mỗi ngày.
              </p>
              <div className="hero-chips">
                <span><BadgeCheck size={16} />1 học viên / 1 giáo viên</span>
                <span><Clock3 size={16} />3 giờ / buổi</span>
                <span><Route size={16} />Lộ trình theo nhu cầu</span>
              </div>
              <div className="hero-actions">
                <Button size="lg" variant="primary" className="primary-button" onPress={() => scrollToId("lead")}>
                  Nhận lộ trình phù hợp <ArrowRight size={18} />
                </Button>
                <Button size="lg" variant="outline" className="outline-button" onPress={() => scrollToId("packages")}>
                  Xem gói học
                </Button>
              </div>
              <p className="hero-microcopy">Chỉ cần cho biết kỹ năng hiện tại và tình huống bạn đang ngại nhất.</p>
            </div>
            <RouteVisual />
          </div>
          <div className="container hero-proofbar">
            <div><span>01</span><p><strong>1 kèm 1</strong>Không chia ca đông</p></div>
            <div><span>02</span><p><strong>Đường thật</strong>Không chỉ quanh sân tập</p></div>
            <div><span>03</span><p><strong>Theo mục tiêu</strong>Tập trung đúng điểm yếu</p></div>
            <div><span>04</span><p><strong>Tại Hà Nội</strong>Route thực tế, linh hoạt</p></div>
          </div>
        </section>

        <section id="pain" className="section pain-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <SectionEyebrow>ĐIỂM NGHẼN THỰC TẾ</SectionEyebrow>
                <h2>Có bằng không đồng nghĩa với<br /><span>đã sẵn sàng lái một mình.</span></h2>
              </div>
              <p>Chọn đúng tình huống bạn đang vướng. Đây cũng là thông tin quan trọng nhất để DNT xây lộ trình thay vì bắt bạn học lại từ đầu.</p>
            </div>
            <div className="pain-grid">
              {painPoints.map(({ icon: Icon, title, text, value }) => (
                <Card key={title} className="pain-card" variant="default">
                  <Card.Content>
                    <div className="pain-icon"><Icon size={22} /></div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <button type="button" onClick={() => chooseNeed(value)}>Tôi đang vướng chỗ này <ChevronRight size={16} /></button>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="section method-section">
          <div className="container method-layout">
            <div className="method-sticky">
              <SectionEyebrow>CÁCH DNT TỔ CHỨC BUỔI HỌC</SectionEyebrow>
              <h2>Không học theo một giáo án cứng <span>cho tất cả.</span></h2>
              <p>Đi từ đúng vấn đề bạn đang sợ, luyện trong tình huống thật rồi mới tăng độ khó. Mỗi buổi học phải trả lời được: <strong>hôm nay mình xử lý tốt hơn điều gì?</strong></p>
              <Button size="lg" variant="outline" className="light-outline" onPress={() => scrollToId("lead")}>Để DNT đánh giá kỹ năng <ArrowRight size={18} /></Button>
            </div>
            <div className="steps-list">
              {steps.map((step, index) => (
                <div className="step-row" key={step.no}>
                  <div className="step-number">{step.no}</div>
                  <div className="step-copy">
                    <div className="step-kicker">{index === 0 ? "Bắt đầu" : index === steps.length - 1 ? "Kết thúc" : "Tiếp theo"}</div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section route-section">
          <div className="container">
            <div className="section-heading centered-heading">
              <SectionEyebrow>HỌC TRÊN ĐƯỜNG THẬT</SectionEyebrow>
              <h2>Từ phố đông đến cao tốc —<br /><span>luyện đúng môi trường bạn sẽ tự lái.</span></h2>
              <p>Các tuyến dưới đây là ví dụ từ lộ trình DNT đang sử dụng; cung đường thực tế có thể điều chỉnh theo mục tiêu và tình trạng giao thông.</p>
            </div>
            <div className="route-card-grid">
              {routes.map(({ tag, icon: Icon, title, route, text }) => (
                <Card key={title} className="route-card" variant="default">
                  <Card.Content>
                    <div className="route-card-top"><span><Icon size={17} />{tag}</span><Navigation size={18} /></div>
                    <h3>{title}</h3>
                    <p className="route-name"><MapPin size={16} />{route}</p>
                    <p>{text}</p>
                  </Card.Content>
                </Card>
              ))}
            </div>
            <div className="route-note"><Route size={18} /><span>Cần luyện đúng tuyến đi làm / đưa đón con / đi sân bay?</span><button onClick={() => chooseNeed("Cung đường riêng")}>Tạo lộ trình riêng <ArrowRight size={15} /></button></div>
          </div>
        </section>

        <section id="packages" className="section package-section">
          <div className="container">
            <div className="section-heading split-heading package-heading">
              <div>
                <SectionEyebrow>GÓI HỌC</SectionEyebrow>
                <h2>Chọn theo mức độ hiện tại,<br /><span>không chọn theo cảm tính.</span></h2>
              </div>
              <div className="price-note"><Zap size={18} /><p><strong>Giá sẽ được xác nhận khi tư vấn.</strong> DNT hiện có tài liệu giá ở nhiều thời điểm; bản landing page không niêm yết số cũ để tránh gây nhầm lẫn.</p></div>
            </div>
            <div className="package-grid">
              {packages.map((item) => (
                <Card key={item.id} className={`package-card ${item.featured ? "featured" : ""}`} variant={item.featured ? "tertiary" : "default"}>
                  <Card.Header>
                    <div className="package-label">{item.label}</div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Description>{item.meta}</Card.Description>
                  </Card.Header>
                  <Card.Content>
                    <p className="package-description">{item.description}</p>
                    <ul>
                      {item.features.map((feature) => <li key={feature}><span><Check size={15} /></span>{feature}</li>)}
                    </ul>
                  </Card.Content>
                  <Card.Footer>
                    <Button
                      fullWidth
                      size="lg"
                      variant={item.featured ? "primary" : "outline"}
                      className={item.featured ? "primary-button" : "package-outline"}
                      onPress={() => chooseNeed(item.title)}
                    >
                      {item.id === "lo-trinh-rieng" ? "Nhận báo giá lộ trình" : `Tư vấn gói ${item.title}`}
                      <ArrowRight size={17} />
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section outcomes-section">
          <div className="container outcomes-layout">
            <div className="outcomes-copy">
              <SectionEyebrow>ĐÍCH ĐẾN CỦA LỘ TRÌNH</SectionEyebrow>
              <h2>Không hứa “lái giỏi sau vài buổi”.<br /><span>Tập trung vào kỹ năng đo được.</span></h2>
              <p>Điều quan trọng là bạn biết mình đang làm gì, nhận ra rủi ro sớm hơn và xử lý tình huống có trình tự thay vì phản xạ theo cảm tính.</p>
            </div>
            <div className="outcome-list">
              {[
                "Căn xe và kiểm soát khoảng cách chủ động hơn",
                "Quan sát gương và điểm mù theo một quy trình rõ",
                "Chuyển làn, rẽ và xử lý giao cắt bình tĩnh hơn",
                "Ghép xe có trình tự thay vì thử - sai nhiều lần",
                "Biết cách vào/ra cao tốc và giữ khoảng cách an toàn",
                "Tự nhận ra tình huống nào mình chưa đủ kỹ năng để xử lý",
              ].map((item) => <div key={item}><span><Check size={16} /></span><p>{item}</p></div>)}
            </div>
          </div>
        </section>

        <section id="lead" className="section lead-section">
          <div className="container lead-layout">
            <div className="lead-copy">
              <div className="lead-orbit"><div><SteeringWheel size={50} /></div></div>
              <SectionEyebrow>BẮT ĐẦU TỪ 2 PHÚT TRAO ĐỔI</SectionEyebrow>
              <h2>Không chắc nên học 3 buổi, 5 buổi<br />hay một lộ trình riêng?</h2>
              <p>Cho DNT biết tình trạng hiện tại. Tư vấn viên sẽ giúp xác định trọng tâm cần luyện trước khi bạn quyết định đăng ký.</p>
              <div className="lead-direct">
                <a href={`tel:${PHONE}`}><span><Phone size={19} /></span><div><small>Gọi tư vấn</small><strong>{PHONE_DISPLAY}</strong></div></a>
                <a href={ZALO_URL} target="_blank" rel="noreferrer"><span><MessageCircle size={19} /></span><div><small>Nhắn nhanh</small><strong>Zalo DNT</strong></div></a>
              </div>
            </div>
            <div className="lead-panel">
              <div className="lead-panel-head"><div><small>FORM TƯ VẤN NHANH</small><h3>Nhận lộ trình phù hợp</h3></div><span><Headphones size={18} />1:1</span></div>
              <MiniLeadForm key={selectedNeed || "default"} initialNeed={selectedNeed} />
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="container faq-layout">
            <div className="faq-heading">
              <SectionEyebrow>GIẢI ĐÁP TRƯỚC KHI ĐĂNG KÝ</SectionEyebrow>
              <h2>Câu hỏi thường gặp</h2>
              <p>Nếu tình huống của bạn khác các trường hợp dưới đây, gọi trực tiếp để tư vấn nhanh hơn.</p>
              <a href={`tel:${PHONE}`}><Phone size={17} />{PHONE_DISPLAY}</a>
            </div>
            <Accordion variant="default" className="faq-accordion">
              {faqs.map((item, index) => (
                <Accordion.Item key={item.q} id={`faq-${index}`} className="faq-item">
                  <Accordion.Heading>
                    <Accordion.Trigger className="faq-trigger">
                      <span>{item.q}</span><Accordion.Indicator />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="faq-body">{item.a}</Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="section secondary-offer-section">
          <div className="container secondary-offer">
            <div className="secondary-icon"><GraduationCap size={29} /></div>
            <div><small>CHƯA CÓ BẰNG LÁI?</small><h3>DNT cũng có chương trình đào tạo hạng B.</h3><p>Đây là nhu cầu khác với bổ túc tay lái. Để lại thông tin để được tư vấn đúng loại khóa và hồ sơ cần chuẩn bị.</p></div>
            <Button size="lg" variant="outline" className="secondary-button" onPress={() => chooseNeed("Khóa học hạng B")}>Tư vấn khóa hạng B <ArrowRight size={17} /></Button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><Logo /><p>Bổ túc tay lái 1 kèm 1 trên đường thực tế tại Hà Nội.</p></div>
          <div className="footer-links"><small>LIÊN HỆ</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a><a href={ZALO_URL} target="_blank" rel="noreferrer">Zalo</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a></div>
          <div className="footer-links"><small>TRUY CẬP NHANH</small><button onClick={() => scrollToId("method")}>Cách học</button><button onClick={() => scrollToId("packages")}>Gói học</button><button onClick={() => scrollToId("faq")}>FAQ</button></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 DNT Group.</span><span>Lộ trình và cung đường trên trang mang tính tham khảo.</span></div>
      </footer>

      <div className="mobile-sticky-cta">
        <a href={`tel:${PHONE}`}><Phone size={18} /><span>Gọi ngay</span></a>
        <button type="button" onClick={() => scrollToId("lead")}><MessageCircle size={18} /><span>Nhận lộ trình</span></button>
      </div>
    </div>
  );
}

export default App;
