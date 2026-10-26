import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Clock, Download, Gavel, Image as ImageIcon, Lock, Menu, MessageSquare, ScanLine, ShieldAlert, ShieldCheck, Sparkles, Upload, UserCheck, X } from 'lucide-react'
import { Link, Route, Routes } from 'react-router-dom'
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react'
import ProductOverview from './pages/ProductOverview'
import CoreAdvantages from './pages/CoreAdvantages'
import TechArchitecture from './pages/TechArchitecture'
import MultiModalParsing from './pages/features/MultiModalParsing'
import RiskAnnotation from './pages/features/RiskAnnotation'
import PlainTalkScript from './pages/features/PlainTalkScript'
import LawyerReview from './pages/features/LawyerReview'
import LaborEmployment from './pages/scenarios/LaborEmployment'
import PurchaseSales from './pages/scenarios/PurchaseSales'
import LeaseService from './pages/scenarios/LeaseService'
import EquityCooperation from './pages/scenarios/EquityCooperation'

interface NavItem {
  label: string
  href: string
  children?: { label: string; desc?: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: '首页',
    href: '/',
    children: [
      { label: '产品概览', desc: '签安 Agent 核心能力速览', href: '/product' },
      { label: '核心优势', desc: '大模型 + 律师双引擎', href: '/advantages' },
      { label: '技术架构', desc: '多模态与合规底座', href: '/architecture' },
    ],
  },
  {
    label: '产品功能',
    href: '#',
    children: [
      { label: '多模态合同解析', desc: '图片 / PDF / 扫描件一键结构化', href: '/features/parsing' },
      { label: '条款风险标注', desc: '高风险条款自动高亮提示', href: '/features/risk' },
      { label: '白话解读与话术', desc: '法律条文转通俗表达', href: '/features/plain-talk' },
      { label: '律师复核留痕', desc: '人工复核全程可追溯', href: '/features/lawyer-review' },
    ],
  },
  {
    label: '适用场景',
    href: '#',
    children: [
      { label: '劳动用工', desc: '劳动合同 / 规章制度审查', href: '/scenarios/labor' },
      { label: '采购销售', desc: '买卖 / 服务合同风险把关', href: '/scenarios/purchase' },
      { label: '租赁服务', desc: '房屋 / 设备租赁协议', href: '/scenarios/lease' },
      { label: '股权合作', desc: '股东协议 / 投资条款审查', href: '/scenarios/equity' },
    ],
  },
  {
    label: '安全与合规',
    href: '#',
    children: [
      { label: '回应算法备案', desc: '已完成大模型算法合规备案', href: '#' },
      { label: '数据不训练', desc: '客户合同数据绝不用于模型训练', href: '#' },
      { label: '人工复核边界', desc: '律师介入边界与责任划分清晰', href: '#' },
    ],
  },
  {
    label: '定价',
    href: '#',
    children: [
      { label: '免费试用版', desc: '每日 3 份合同 · 基础风险标注', href: '#' },
      { label: '专业版', desc: '不限量 · 全功能 · 优先客服', href: '#' },
      { label: '企业版', desc: '私有化部署 · 专属律师复核', href: '#' },
    ],
  },
  {
    label: '关于我们',
    href: '#',
    children: [
      { label: '京师案例', desc: '京师律所标杆合作案例', href: '#' },
      { label: '团队', desc: '法律 + AI 跨界核心团队', href: '#' },
      { label: '政策资源', desc: '深度政策与行业资源背书', href: '#' },
    ],
  },
]

function useLondonTime() {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()))

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

function RollText({ children }: { children: string }) {
  return (
    <span className="block h-[20px] overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="flex h-[20px] items-center whitespace-nowrap">
          {children}
        </span>
        <span className="flex h-[20px] items-center whitespace-nowrap">
          {children}
        </span>
      </span>
    </span>
  )
}

function PartnerMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  )
}

function Dropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const handleEnter = () => {
    setOpen(true)
  }
  const handleLeave = () => {
    setOpen(false)
  }

  return (
    <div
      ref={ref}
      className="group relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
      >
        {item.label}
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown panel — glassmorphism */}
      <div className="absolute left-1/2 top-full z-50 w-[260px] -translate-x-1/2 pt-2">
        <div
          className={`overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <div className="flex flex-col p-2">
            {item.children?.map((child) => {
              const inner = (
                <>
                  <span className="flex items-center justify-between text-[14px] font-medium text-gray-900">
                    {child.label}
                    <ArrowRight
                      size={14}
                      className="text-gray-400 opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                    />
                  </span>
                  {child.desc && (
                    <span className="mt-0.5 text-[12px] leading-relaxed text-gray-500">
                      {child.desc}
                    </span>
                  )}
                </>
              )
              const cls =
                'group/item flex flex-col rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/80'
              return child.href.startsWith('/') ? (
                <Link
                  key={child.label}
                  to={child.href}
                  onClick={() => setOpen(false)}
                  className={cls}
                >
                  {inner}
                </Link>
              ) : (
                <a key={child.label} href={child.href} className={cls}>
                  {inner}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileDropdown({
  item,
  onNavigate,
}: {
  item: NavItem
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl px-2 py-3 text-[24px] font-medium leading-none text-gray-900 transition-colors hover:bg-gray-50 min-[420px]:text-[28px]"
      >
        {item.label}
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'mt-1 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pl-4">
            {item.children?.map((child) => {
              const inner = (
                <>
                  <span className="text-[16px] font-medium text-gray-900">
                    {child.label}
                  </span>
                  {child.desc && (
                    <span className="mt-0.5 text-[12px] text-gray-500">
                      {child.desc}
                    </span>
                  )}
                </>
              )
              const cls =
                'flex flex-col rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50'
              return child.href.startsWith('/') ? (
                <Link
                  key={child.label}
                  to={child.href}
                  onClick={onNavigate}
                  className={cls}
                >
                  {inner}
                </Link>
              ) : (
                <a
                  key={child.label}
                  href={child.href}
                  onClick={onNavigate}
                  className={cls}
                >
                  {inner}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function AxionOrangeButton({
  label,
  size = 'base',
  className = '',
}: {
  label: string
  size?: 'base' | 'hero'
  className?: string
}) {
  return (
    <button
      type="button"
      className={`group flex items-center gap-3 rounded-full bg-[#F26522] pr-2 text-white transition-colors duration-300 hover:bg-[#e05a1a] ${
        size === 'hero'
          ? 'pl-5 py-2 text-[13px] sm:pl-6 sm:text-[14px]'
          : 'pl-5 py-2 text-[13px]'
      } ${className}`}
    >
      <span className="font-medium">
        <RollText>{label}</RollText>
      </span>
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-white ${
          size === 'hero' ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-7 w-7'
        } transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45`}
      >
        <ArrowRight size={14} className="text-[#F26522]" />
      </span>
    </button>
  )
}

function Hero() {
  const time = useLondonTime()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#EFEFEF]">
      {/* Animated shader background */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <Shader className="h-full w-full">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      {/* Navigation */}
      <nav className="relative z-20">
        <div className="mx-auto max-w-[1440px] p-2 sm:p-3">
          <div className="flex items-center justify-between rounded-full border border-white/60 bg-white/70 p-[5px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-6 pl-2">
              <a
                href="#"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 sm:h-10 sm:w-10"
                aria-label="Axion Studio home"
              >
                <span className="text-[10px] font-bold tracking-tight text-white sm:text-[11px]">
                  AX
                </span>
              </a>
              <div className="hidden items-center gap-6 md:flex">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <Dropdown key={item.label} item={item} />
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <button
                type="button"
                className="rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-gray-700"
              >
                登录
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Menu'}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white md:hidden"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer pushing content to the bottom of the viewport */}
      <div className="flex-1" />

      {/* Hero content */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
          京师律所合作伙伴
        </p>

        <h1 className="max-w-[1100px] text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
          签安 Agent SignSafe
        </h1>

        <p className="mt-5 max-w-[640px] text-[15px] leading-[1.7] text-gray-600 sm:mt-7 sm:text-[17px]">
          签字之前，先看一眼。基于 DeepSeek 原生多模态，把律所级的合同审查能力，做到小老板用得起。
        </p>

        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
          <AxionOrangeButton label="Start a project" size="hero" />

          <div className="flex w-fit items-center gap-2 rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            <PartnerMark className="h-5 w-5 shrink-0 text-[#E8704E] sm:h-6 sm:w-6" />
            <span className="text-[13px] font-medium text-gray-900 sm:text-[14px]">
              Certified Partner
            </span>
            <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]">
              Featured
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-gray-500 sm:mt-10 sm:text-[13px]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#F26522]" />
            京师律所实战验证
          </span>
          <span className="h-3 w-px bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#F26522]" />
            DeepSeek 多模态驱动
          </span>
          <span className="h-3 w-px bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <Lock size={14} className="text-[#F26522]" />
            合同数据不用于训练
          </span>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menuOpen ? '' : 'pointer-events-none'
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 mx-3 mb-3 rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_-8px_40px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mb-8 flex items-center gap-1.5 text-[13px] text-gray-600">
            <Clock size={14} />
            {time} in London
          </div>

          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <MobileDropdown key={item.label} item={item} onNavigate={() => setMenuOpen(false)} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-2 py-3 text-[24px] font-medium leading-none text-gray-900 transition-colors hover:bg-gray-50 min-[420px]:text-[28px]"
                >
                  {item.label}
                </a>
              )
            )}
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-full bg-gray-900 px-4 py-3 text-[15px] font-medium text-white"
            >
              登录
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const SCENARIO_IMAGE =
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=worried%20small%20business%20owner%20reviewing%20a%20paper%20contract%20at%20desk%2C%20magnifying%20glass%2C%20soft%20daylight%2C%20minimalist%20modern%20office%2C%20editorial%20photography&image_size=landscape_16_9'

const PAIN_STATS = [
  { value: '90%', label: '中小微企业没有专职法务', hint: '合同全靠老板自己硬看' },
  { value: '10—15万', unit: '/年', label: '传统律所年费起步', hint: '小公司根本请不起' },
  { value: '几分钱', label: '签安审查一份合同的模型成本', hint: '一杯奶茶钱审十份' },
]

function About() {
  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#F26522] sm:h-7 sm:w-7 sm:text-[12px]">
            1
          </span>
          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/30 hover:bg-white/80 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-[13px]">
            合同审查的现实困境
          </span>
        </div>

        <h2 className="mb-10 px-5 text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-14 sm:px-8 lg:mb-16 lg:px-12">
          签字之前，你真的看懂了吗？
        </h2>

        {/* Three stat cards */}
        <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-3 sm:gap-5 sm:px-8 lg:px-12">
          {PAIN_STATS.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#F26522]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-baseline gap-1">
                  <span className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-none tracking-[-0.02em] text-gray-900">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-[15px] font-medium text-gray-500">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[15px] font-medium leading-snug text-gray-900">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">
                  {stat.hint}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scenario highlight */}
        <div className="mt-8 px-5 sm:mt-10 sm:px-8 lg:px-12">
          <div className="group relative overflow-hidden rounded-2xl border border-[#F26522]/20 bg-gradient-to-br from-[#F26522]/8 to-white/40 p-6 shadow-[0_8px_30px_rgba(242,101,34,0.08)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_16px_48px_rgba(242,101,34,0.14)] sm:p-8">
            <p className="relative text-[17px] font-medium leading-[1.7] text-gray-900 sm:text-[20px]">
              <span className="text-[#F26522]">“</span>
              供应商发来一张拍照的合同，付款条款藏在附件里，等你看懂的时候，已经签了。
              <span className="text-[#F26522]">”</span>
            </p>
          </div>
        </div>

        {/* Scenario image */}
        <div className="mt-8 px-5 sm:mt-10 sm:px-8 lg:px-12">
          <div className="group relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.10)]">
            <img
              src={SCENARIO_IMAGE}
              alt="合同审查场景"
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  )
}

const WHY_NOW_ROWS = [
  {
    dim: '扫描件 / 拍照合同',
    past: '先 OCR 再分析，错一个字下游全错',
    now: '图片直接进模型，DocVQA 95.6%',
  },
  {
    dim: '整份合同 + 附件',
    past: '分块切割，丢上下文',
    now: '1M 上下文一次送入，不切块',
  },
  {
    dim: '单份成本',
    past: '链路长、成本不可控',
    now: '几分钱到一毛，订阅制算得过来账',
  },
]

function CaseStudies() {
  return (
    <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#F26522] sm:h-7 sm:w-7 sm:text-[12px]">
            2
          </span>
          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/30 hover:bg-white/80 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-[13px]">
            DeepSeek 多模态带来的关键变化
          </span>
        </div>

        <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 lg:mb-16 lg:px-12">
          为什么是现在
        </h2>

        {/* Table header */}
        <div className="hidden px-5 sm:grid sm:grid-cols-[1.1fr_1fr_1.1fr] sm:gap-4 sm:px-8 lg:px-12">
          <div className="px-4 py-2 text-[13px] font-semibold uppercase tracking-wide text-gray-400">
            维度
          </div>
          <div className="px-4 py-2 text-[13px] font-semibold uppercase tracking-wide text-gray-400">
            过去
          </div>
          <div className="px-4 py-2 text-[13px] font-semibold uppercase tracking-wide text-[#F26522]">
            签安 + DeepSeek
          </div>
        </div>

        {/* Comparison rows */}
        <div className="mt-2 flex flex-col gap-4 px-5 sm:mt-4 sm:gap-5 sm:px-8 lg:px-12">
          {WHY_NOW_ROWS.map((row) => (
            <div
              key={row.dim}
              className="group grid grid-cols-1 gap-3 rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] sm:grid-cols-[1.1fr_1fr_1.1fr] sm:gap-4 sm:p-6"
            >
              <div className="flex items-center">
                <span className="text-[15px] font-semibold text-gray-900 sm:text-[16px]">
                  {row.dim}
                </span>
              </div>

              <div className="rounded-xl border border-gray-200/70 bg-gray-50/60 px-4 py-3">
                <span className="text-[12px] font-medium text-gray-400 sm:hidden">
                  过去 ·{' '}
                </span>
                <span className="text-[14px] leading-relaxed text-gray-500 line-through decoration-gray-300/60 sm:text-[15px]">
                  {row.past}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-[#F26522]/25 bg-gradient-to-br from-[#F26522]/10 to-white/60 px-4 py-3 transition-all duration-500 group-hover:border-[#F26522]/40">
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#F26522]/15 blur-2xl" />
                <span className="text-[12px] font-medium text-[#F26522] sm:hidden">
                  签安 + DeepSeek ·{' '}
                </span>
                <span className="relative text-[14px] font-medium leading-relaxed text-gray-900 sm:text-[15px]">
                  {row.now}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FLOW_STEPS = [
  { icon: Upload, title: '上传', desc: 'PDF / 图片 / 拍照，直接丢进来' },
  { icon: ScanLine, title: 'DeepSeek 提取', desc: '多模态模型直接识别关键条款' },
  { icon: ShieldAlert, title: '风险标注 + 白话解读', desc: '高中低风险 + "这意味着什么"' },
  { icon: Gavel, title: '律师复核留痕', desc: '关键风险一键申请，全程可追溯' },
  { icon: Download, title: '下载审查摘要', desc: '拿到就能发给对方的下一步' },
]

function ProductFlow() {
  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#F26522] sm:h-7 sm:w-7 sm:text-[12px]">
            3
          </span>
          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/30 hover:bg-white/80 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-[13px]">
            产品闭环
          </span>
        </div>

        <h2 className="mb-12 px-5 text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:px-12">
          从一份合同到一个决策，五步走完
        </h2>

        {/* 5-step flow */}
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-3 lg:gap-5">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.title} className="group relative">
                <div className="relative flex h-full flex-col items-center rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1.5 hover:border-[#F26522]/30 hover:shadow-[0_20px_50px_rgba(242,101,34,0.15)] sm:p-6">
                  {/* Step number */}
                  <span className="absolute right-3 top-3 text-[11px] font-semibold text-gray-300">
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F26522]/10 text-[#F26522] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#F26522] group-hover:text-white sm:h-14 sm:w-14">
                    <step.icon size={22} />
                  </div>

                  <h3 className="text-[15px] font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-gray-500">
                    {step.desc}
                  </p>
                </div>

                {/* Connector arrow (desktop only, between steps) */}
                {i < FLOW_STEPS.length - 1 && (
                  <div className="pointer-events-none absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-gray-300 transition-colors duration-300 group-hover:text-[#F26522] sm:block lg:-right-4">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Core sentence */}
        <div className="mt-10 px-5 sm:mt-14 sm:px-8 lg:px-12">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-900/10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-12">
            <p className="relative text-[clamp(1.1rem,2.6vw,1.6rem)] font-medium leading-[1.5] text-white">
              我们不生成法律意见，
              <br className="sm:hidden" />
              我们生成你能直接发出的下一步。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const CAPABILITIES = [
  {
    icon: ImageIcon,
    title: '多模态入口',
    desc: '合同照片、扫描件、PDF，直接上传，不需要先转文字。',
    tag: 'DeepSeek 原生多模态',
  },
  {
    icon: ShieldAlert,
    title: '风险标注 + 白话解读',
    desc: '每一条款标注高 / 中 / 低风险，附一句"这意味着什么"的大白话。',
    tag: '三级风险体系',
  },
  {
    icon: MessageSquare,
    title: '可复制沟通话术',
    desc: '不是让你"回去研究"，是给你一段能直接发给对方的确认消息。',
    tag: '一键复制',
  },
  {
    icon: UserCheck,
    title: '律师复核留痕',
    desc: '关键风险点一键申请复核，时间戳和操作记录可追溯。',
    tag: '京师律师背书',
  },
]

function CoreCapabilities() {
  return (
    <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#F26522] sm:h-7 sm:w-7 sm:text-[12px]">
            4
          </span>
          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/30 hover:bg-white/80 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-[13px]">
            核心能力
          </span>
        </div>

        <h2 className="mb-12 px-5 text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:px-12">
          每一步，都替你想好了
        </h2>

        <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-5 sm:px-8 lg:px-12">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:border-[#F26522]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F26522]/8 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#F26522]/15" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F26522]/10 text-[#F26522] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#F26522] group-hover:text-white">
                  <cap.icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[17px] font-semibold text-gray-900">
                      {cap.title}
                    </h3>
                    <span className="rounded-full bg-[#F26522]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#F26522]">
                      {cap.tag}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14px] leading-[1.7] text-gray-600">
                    {cap.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TRUST_STATS = [
  { value: '京师律所', label: '真实业务场景运行过的系统', hint: '脱敏案例编号可查' },
  { value: '12,800+', label: '份真实合同已完成审查', hint: '路演前填入实测数据' },
  { value: '94.3%', label: 'AI 标注与律师复核一致率', hint: '首页最值钱的一个数字' },
]

function TrustBar() {
  return (
    <section className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Stats glass bar */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-white/40 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:p-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {TRUST_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`relative text-center sm:text-left ${
                  i > 0 ? 'sm:border-l sm:border-gray-200/70 sm:pl-8' : ''
                }`}
              >
                <div className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-none tracking-[-0.02em] text-gray-900">
                  {stat.value}
                </div>
                <p className="mt-3 text-[14px] font-medium text-gray-900">
                  {stat.label}
                </p>
                <p className="mt-1 text-[12px] text-gray-500">{stat.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance short statements */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-gray-500 sm:text-[13px]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#F26522]" />
            合同文件不用于模型训练
          </span>
          <span className="h-3 w-px bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <Lock size={14} className="text-[#F26522]" />
            敏感字段前端脱敏
          </span>
          <span className="h-3 w-px bg-gray-300" />
          <span className="flex items-center gap-1.5">
            <UserCheck size={14} className="text-[#F26522]" />
            关键决策人工复核可追溯
          </span>
        </div>
      </div>
    </section>
  )
}

const TESTIMONIALS = [
  {
    quote: '这条竞业限制我原来根本没注意到，差点就签了。',
    author: '某贸易公司创始人 · 王总',
    context: '上传一份劳动合同后被标注出隐藏竞业条款',
  },
  {
    quote: '以前审一份采购合同要半天，现在五分钟能给对方回消息。',
    author: '某制造企业行政负责人 · 李女士',
    context: '使用可复制话术直接与供应商确认付款条款',
  },
]

function Testimonials() {
  return (
    <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#F26522] sm:h-7 sm:w-7 sm:text-[12px]">
            5
          </span>
          <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#F26522]/30 hover:bg-white/80 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-[13px]">
            用户证言
          </span>
        </div>

        <h2 className="mb-12 px-5 text-[clamp(1.5rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:px-12">
          他们已经在用了
        </h2>

        <div className="grid grid-cols-1 gap-5 px-5 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:px-12">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.quote}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/85 to-white/40 p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] sm:p-8"
            >
              <div className="pointer-events-none absolute right-5 top-3 font-serif text-[80px] leading-none text-[#F26522]/15">
                &ldquo;
              </div>
              <blockquote className="relative text-[17px] font-medium leading-[1.7] text-gray-900 sm:text-[18px]">
                {t.quote}
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-gray-200/70 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-[13px] font-semibold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-gray-900">
                    {t.author}
                  </div>
                  <div className="mt-0.5 text-[12px] text-gray-500">
                    {t.context}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function BottomCTA() {
  return (
    <section className="bg-white pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="group relative overflow-hidden rounded-3xl border border-[#F26522]/20 bg-gradient-to-br from-[#F26522] via-[#F26522] to-[#e05a1a] p-10 text-center shadow-[0_20px_60px_rgba(242,101,34,0.25)] sm:p-14 lg:p-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[clamp(1.6rem,4.5vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
              上传你的第一份合同，免费。
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-[16px]">
              不需要注册、不需要信用卡，传一份合同，看看 AI 能帮你发现什么。
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="group flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 text-[15px] font-semibold text-[#F26522] shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                <RollText>免费上传合同</RollText>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26522] text-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
                  <ArrowRight size={16} />
                </span>
              </button>
              <a
                href="#"
                className="flex items-center gap-2 text-[14px] font-medium text-white/80 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
              >
                先看演示
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FOOTER_LINKS = [
  {
    title: '产品',
    items: ['产品功能', '适用场景', '定价', '免费试用'],
  },
  {
    title: '资源',
    items: ['使用文档', 'API 接入', '更新日志', '帮助中心'],
  },
  {
    title: '公司',
    items: ['关于我们', '京师案例', '团队', '联系我们'],
  },
  {
    title: '合规',
    items: ['安全与合规', '数据不训练', '算法备案', '隐私政策'],
  },
]

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/40 bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Glass top edge highlight */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F26522] text-white shadow-lg shadow-[#F26522]/30">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-[17px] font-semibold tracking-tight text-white">
                  签安 Agent SignSafe
                </div>
                <div className="mt-0.5 text-[12px] text-gray-400">
                  京师律所合作伙伴
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.75] text-gray-400">
              基于 DeepSeek 原生多模态，把律所级的合同审查能力，做到小老板用得起。签字之前，先看一眼。
            </p>

            {/* Glass contact card */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26522]/20 text-[#F26522]">
                <MessageSquare size={15} />
              </span>
              <div className="leading-tight">
                <div className="text-[12px] text-gray-400">合作咨询</div>
                <div className="text-[13px] font-medium text-white">
                  contact@signsafe.ai
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-1 text-[13.5px] text-gray-400 transition-colors duration-300 hover:text-white"
                      >
                        <span className="h-px w-0 bg-[#F26522] transition-all duration-300 group-hover:w-3" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-gray-500">
            © 2026 签安 SignSafe. 基于 DeepSeek 多模态能力构建 · 合同文件不用于模型训练
          </p>
          <div className="flex items-center gap-2">
            {['京ICP备 2026XXXXXX号', '算法备案号', '隐私政策'].map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span className="h-3 w-px bg-gray-700" />}
                <a
                  href="#"
                  className="text-[12px] text-gray-500 transition-colors duration-300 hover:text-white"
                >
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <CaseStudies />
      <ProductFlow />
      <CoreCapabilities />
      <TrustBar />
      <Testimonials />
      <BottomCTA />
      <Footer />
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductOverview />} />
      <Route path="/advantages" element={<CoreAdvantages />} />
      <Route path="/architecture" element={<TechArchitecture />} />
      <Route path="/features/parsing" element={<MultiModalParsing />} />
      <Route path="/features/risk" element={<RiskAnnotation />} />
      <Route path="/features/plain-talk" element={<PlainTalkScript />} />
      <Route path="/features/lawyer-review" element={<LawyerReview />} />
      <Route path="/scenarios/labor" element={<LaborEmployment />} />
      <Route path="/scenarios/purchase" element={<PurchaseSales />} />
      <Route path="/scenarios/lease" element={<LeaseService />} />
      <Route path="/scenarios/equity" element={<EquityCooperation />} />
    </Routes>
  )
}
