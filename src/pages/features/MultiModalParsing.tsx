import { useState } from 'react'
import { ClipboardList, FileText, Image as ImageIcon, Layers, ScanLine, Sparkles, Timer, Zap } from 'lucide-react'
import { FeatureCTA, FeatureHero, GlassCard, PageShell, Reveal, SectionTitle } from '../../components/FeatureShell'

const FORMATS = [
  {
    key: 'photo',
    label: '手机拍照',
    icon: ImageIcon,
    note: '倾斜拍摄 · 盖章遮挡 · 手写批注',
    bars: [86, 72, 94, 58, 80, 66, 90, 52],
    tags: ['手写批注识别', '印章位置定位', '透视校正'],
  },
  {
    key: 'pdf',
    label: 'PDF 文件',
    icon: FileText,
    note: '跨页表格 · 嵌套附件',
    bars: [94, 88, 76, 92, 68, 84, 90, 74],
    tags: ['跨页表格还原', '附件清单提取', '目录结构对齐'],
  },
  {
    key: 'scan',
    label: '扫描件',
    icon: ScanLine,
    note: '灰度噪点 · 双面错位',
    bars: [88, 90, 70, 86, 74, 92, 64, 82],
    tags: ['噪点抑制', '双面对齐', '版式重建'],
  },
]

function ParseDemo() {
  const [active, setActive] = useState(0)
  const f = FORMATS[active]

  return (
    <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 to-white/45 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.07)] backdrop-blur-md sm:p-9">
      {/* Format tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FORMATS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(i)}
            className={`group/tab flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 ${
              active === i
                ? 'border-transparent bg-gray-900 text-white shadow-lg'
                : 'border-white/70 bg-white/60 text-gray-600 shadow-sm hover:bg-white/90'
            }`}
          >
            <t.icon size={14} className={active === i ? 'text-[#F26522]' : ''} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* 左：非结构化原件 */}
        <div>
          <div className="mb-2 text-[11.5px] font-semibold text-gray-400">上传原件 · 非结构化</div>
          <div className="relative">
            {/* 倾斜的合同照片 mock */}
            <div
              key={f.key}
              className="relative rotate-[-3.5deg] rounded-xl border border-gray-300/70 bg-[#fbfaf7] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]"
            >
              <div className="absolute -right-2 -top-2 rotate-12 text-[10px] text-gray-400">📎 附件1</div>
              {f.bars.map((w, i) => (
                <div
                  key={i}
                  className={`mb-1.5 h-[7px] rounded-sm ${
                    i === 2 || i === 5 ? 'bg-gray-400/60' : 'bg-gray-300/50'
                  }`}
                  style={{ width: `${w}%` }}
                />
              ))}
              {/* 手写批注 */}
              <div className="absolute right-5 top-12 -rotate-6 text-[11px] font-semibold text-red-500/80 underline decoration-wavy">
                这里改一下？
              </div>
              {/* 印章 */}
              <div className="absolute bottom-5 right-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-400/50 text-[9px] font-bold text-red-400/60 rotate-12">
                合同专用章
              </div>
            </div>
            <div className="mt-3 text-center text-[11.5px] text-gray-500">{f.note}</div>
          </div>
        </div>

        {/* 中：闪电连接 */}
        <div className="flex items-center justify-center">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#F26522] text-white shadow-lg shadow-[#F26522]/40 transition-transform duration-300 hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#F26522]/30" />
            <Zap size={20} className="relative" />
          </div>
        </div>

        {/* 右：结构化结果 */}
        <div>
          <div className="mb-2 flex items-center justify-between text-[11.5px]">
            <span className="font-semibold text-[#F26522]">结构化输出 · JSON</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Timer size={11} />5.2s
            </span>
          </div>
          <div className="rounded-xl border border-[#F26522]/25 bg-white/80 p-3.5 shadow-sm backdrop-blur-sm">
            {[
              { k: '甲方', v: '杭州某某科技有限公司', hit: false },
              { k: '乙方', v: '深圳某某供应链有限公司', hit: false },
              { k: '合同金额', v: '¥ 486,000.00', hit: true },
              { k: '付款账期', v: '验收后 60 天', hit: true },
              { k: '履行期限', v: '2026-11-01 → 2027-10-31', hit: false },
              { k: '违约责任', v: '日万分之五 · 上限 30%', hit: true },
              { k: '争议管辖', v: '合同签订地人民法院', hit: false },
            ].map((r, i) => (
              <div
                key={r.k}
                className="group/row flex items-center justify-between gap-2 rounded-md px-1.5 py-[5px] transition-colors duration-200 hover:bg-[#F26522]/6"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="shrink-0 text-[11px] text-gray-400">{r.k}</span>
                <span
                  className={`truncate text-[11.5px] font-medium ${
                    r.hit ? 'rounded bg-[#F26522]/12 px-1.5 py-0.5 text-[#F26522]' : 'text-gray-800'
                  }`}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {f.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-gray-600 backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/40 hover:text-[#F26522]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    icon: Sparkles,
    t: '原生视觉直读',
    d: '基于 DeepSeek 原生多模态模型，突破「先转文字再分析」的瓶颈。PDF、微信聊天截图、手机拍的扫描件，直接「看图」理解。',
  },
  {
    icon: Layers,
    t: '复杂版面还原',
    d: '精准识别跨页表格、嵌套附件、手写签名区和印章位置，不丢失关键上下文。',
  },
  {
    icon: ClipboardList,
    t: '超长文本处理',
    d: '利用模型 1M 超大上下文窗口，几十页合同连同附件一次性送入，不切块、不断章取义。',
  },
  {
    icon: FileText,
    t: '一键结构化',
    d: '将非结构化合同文本瞬间转为标准 JSON，自动提取甲乙方、金额、期限、违约责任等关键要素。',
  },
]

export default function MultiModalParsing() {
  return (
    <PageShell title="多模态合同解析" icon={ScanLine}>
      <FeatureHero
        badge="产品功能 01"
        title="图片 / PDF / 扫描件，"
        highlight="一键结构化"
        subtitle="传统 AI 处理合同必须先经过 OCR 转文字，遇到拍照倾斜、盖章遮挡、表格错位、手写批注，文字识别错误率极高，导致「垃圾进，垃圾出」，后面的风险分析全错。签安让合同直接进模型。"
        value="别管是电子版还是对方随手拍的照片，扔进来，5 秒钟看清里面到底写了什么。"
      />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle num="1" title="核心痛点" desc="垃圾进，垃圾出 · OCR 两段式链路的错误传播" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <GlassCard>
              <div className="text-[12px] font-semibold text-gray-400">传统链路</div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] text-gray-500">
                {['拍照合同', 'OCR 转文字', '文本模型', '风险分析'].map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1">{s}</span>
                    {i < 3 && <span className="text-gray-300">→</span>}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-[1.8] text-gray-600">
                倾斜、遮挡、错位、手写批注都会在第一步失真。一个错字，下游条款识别与风险判断全盘偏移。
              </p>
            </GlassCard>
            <GlassCard accent>
              <div className="text-[12px] font-semibold text-[#F26522]">签安链路</div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] text-gray-700">
                {['图片直接进模型', '版面理解 + 语义提取', '结构化条款'].map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="rounded-md border border-[#F26522]/30 bg-white px-2 py-1 font-medium">{s}</span>
                    {i < 2 && <span className="text-[#F26522]/50">→</span>}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-[1.8] text-gray-700">
                一次推理同时完成版面理解、文字识别和语义提取，没有中间态可失真。
              </p>
            </GlassCard>
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <SectionTitle num="2" title="功能演示" desc="点击切换输入格式，看同一份合同的解析路径" />
            <ParseDemo />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <Reveal>
          <SectionTitle num="3" title="四项关键能力" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <GlassCard className="h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F26522]/10 text-[#F26522] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F26522] group-hover:text-white">
                    <f.icon size={18} />
                  </span>
                  <h3 className="mt-4 text-[14.5px] font-semibold text-gray-900">{f.t}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-gray-500">{f.d}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <FeatureCTA note="不用先转文字，图片直接进模型。" />
    </PageShell>
  )
}
