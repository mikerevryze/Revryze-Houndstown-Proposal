import { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  Clock,
  Target,
  TrendingUp,
  PhoneCall,
  FileText,
  CheckCircle2,
  BarChart3,
  Building2,
  DollarSign,
  Users,
  Megaphone,
  PawPrint,
  Heart,
  Star,
  Crown,
  Dog
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ProposalPage() {
  // Calculator state (per-location ROI)
  const [locationOpenings, setLocationOpenings] = useState(20);
  const [lifetimeMonths, setLifetimeMonths] = useState(12);

  // Membership mix sliders (50/50 default split)
  const [twoXMembers, setTwoXMembers] = useState(50);
  const [eightXMembers, setEightXMembers] = useState(50);

  const MEMBER_GUARANTEE = 100;
  const STANDARD_FEE = 25000;
  const VOLUME_FEE = 20000;
  const VOLUME_THRESHOLD = 10;
  const ROYALTY_RATE = 0.07;
  const MARKETING_SPEND = 15000;
  const COMMUNITY_LEADS = 250;

  // 8x tier pricing
  const TIER_1_PRICE = 349;
  const TIER_2_PRICE = 369;
  const TIER_3_PRICE = 389;
  const TIER_SIZE = 50;
  const TWO_X_PRICE = 99;

  // Calculate 8x tier breakdown
  const tier1Count = Math.min(eightXMembers, TIER_SIZE);
  const tier2Count = Math.min(Math.max(eightXMembers - TIER_SIZE, 0), TIER_SIZE);
  const tier3Count = Math.min(Math.max(eightXMembers - TIER_SIZE * 2, 0), TIER_SIZE);

  // Monthly recurring revenue
  const twoXRevenue = twoXMembers * TWO_X_PRICE;
  const eightXRevenue = (tier1Count * TIER_1_PRICE) + (tier2Count * TIER_2_PRICE) + (tier3Count * TIER_3_PRICE);
  const totalMonthlyRevenue = twoXRevenue + eightXRevenue;
  const totalAnnualRevenue = totalMonthlyRevenue * 12;
  const totalMembers = twoXMembers + eightXMembers;

  // Derived values from membership sliders feed into ROI calculator
  const membersAcquired = totalMembers;
  const monthlyValue = totalMembers > 0 ? Math.round(totalMonthlyRevenue / totalMembers) : 0;

  // Per-location ROI calculator
  const effectiveFee = locationOpenings >= VOLUME_THRESHOLD ? VOLUME_FEE : STANDARD_FEE;
  const refundPercent = Math.max(0, (MEMBER_GUARANTEE - membersAcquired) / MEMBER_GUARANTEE);
  const refundAmount = refundPercent * effectiveFee;
  const totalStudioInvestment = (effectiveFee - refundAmount) + MARKETING_SPEND;
  const ltvPerMember = monthlyValue * lifetimeMonths;
  const revenuePerStudio = membersAcquired * ltvPerMember;
  const roiMultiple = totalStudioInvestment > 0 ? revenuePerStudio / totalStudioInvestment : 0;
  const royaltyPerStudio = revenuePerStudio * ROYALTY_RATE;
  const totalHQRoyalty = royaltyPerStudio * locationOpenings;
  const isVolumeDiscount = locationOpenings >= VOLUME_THRESHOLD;
  const isGuaranteeActive = membersAcquired < MEMBER_GUARANTEE;

  return (
    <div className="min-h-screen pb-24 bg-[#f2f6f5] text-gray-900 font-sans selection:bg-[#00A7B5] selection:text-white">

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto" data-testid="section-hero">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A7B5]/20 bg-[#00A7B5]/5 text-sm font-semibold mb-8" data-testid="badge-executive-briefing">
            <PawPrint size={16} className="text-[#00A7B5]" />
            <span className="text-[#00A7B5] tracking-wide">HOUNDS TOWN USA x REVRYZE</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] font-heading text-gray-900" data-testid="text-hero-title">
            FILL YOUR PACK.<br />
            <span className="text-[#00A7B5]">BEFORE YOU OPEN.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed" data-testid="text-hero-subtitle">
            Dedicated US-based sales team. Pre-sold memberships before day one. Guaranteed member acquisition for every Hounds Town location.
          </p>
        </div>

        {/* OPERATIONAL COMPARISON */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          {/* Box 1: Traditional Challenge */}
          <Card className="relative bg-white border-gray-200 group hover:border-red-300 shadow-sm" data-testid="card-boulder-reality">
            <div className="absolute top-4 right-4 opacity-20">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4" data-testid="text-boulder-header">The Problem</h3>
              <p className="text-2xl font-bold mb-6 text-gray-900" data-testid="text-boulder-tagline">"Empty Kennels on Opening Day."</p>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex gap-3" data-testid="text-boulder-item-0">
                  <Clock size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Franchisees busy with build-out, hiring, and licensing.
                </li>
                <li className="flex gap-3" data-testid="text-boulder-item-1">
                  <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  No presale strategy = slow ramp to profitability.
                </li>
                <li className="flex gap-3" data-testid="text-boulder-item-2">
                  <Target size={16} className="text-red-500 shrink-0 mt-0.5" />
                  Delayed recurring revenue for both location and HQ.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Box 2: Revryze Solution */}
          <Card className="relative bg-white border-[#00A7B5]/30 group shadow-sm" data-testid="card-revryze-standard">
            <div className="absolute top-4 right-4 opacity-20">
              <Zap className="text-[#00A7B5]" size={40} />
            </div>
            <CardContent className="p-6">
              <h3 className="text-[#00A7B5] font-bold uppercase tracking-widest text-xs mb-4" data-testid="text-revryze-header">The Solution</h3>
              <p className="text-2xl font-bold mb-6 text-gray-900" data-testid="text-revryze-tagline">"A Full Pack. Day One."</p>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex gap-3" data-testid="text-revryze-item-0">
                  <Zap size={16} className="text-[#00A7B5] shrink-0 mt-0.5" />
                  Dedicated US-based team sells memberships during build-out.
                </li>
                <li className="flex gap-3" data-testid="text-revryze-item-1">
                  <CheckCircle2 size={16} className="text-[#00A7B5] shrink-0 mt-0.5" />
                  100-member guarantee. Dollar-for-dollar refund if we miss.
                </li>
                <li className="flex gap-3" data-testid="text-revryze-item-2">
                  <ShieldCheck size={16} className="text-[#00A7B5] shrink-0 mt-0.5" />
                  <span>Recurring revenue and royalties from day one.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* MEMBERSHIP STRUCTURE SECTION */}
      <section className="py-20 px-6 bg-white border-t border-gray-100" data-testid="section-membership">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A7B5]/30 bg-[#00A7B5]/10 text-sm font-semibold mb-6">
              <Dog size={16} className="text-[#00A7B5]" />
              <span className="text-[#00A7B5] tracking-wide">MEMBERSHIP PLANS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading text-gray-900" data-testid="text-membership-title">Join the Pack.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto" data-testid="text-membership-subtitle">
              Two membership tiers designed for every dog owner. Simple pricing. No hidden fees. Just happy hounds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* 2x Per Month Plan */}
            <Card className="relative bg-white border-gray-200 overflow-hidden group hover:border-[#6BD0E0]/60 transition-all shadow-sm" data-testid="card-2x-plan">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#6BD0E0]"></div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#6BD0E0]/20 flex items-center justify-center">
                    <PawPrint size={24} className="text-[#6BD0E0]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">2x Per Month</h3>
                    <p className="text-gray-400 text-sm">Casual Pack Member</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-gray-900">$99</span>
                    <span className="text-gray-400 text-lg">/month</span>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#6BD0E0] shrink-0" />
                    <span>2 daycare visits per month</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#6BD0E0] shrink-0" />
                    <span>Pack-based play groups</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#6BD0E0] shrink-0" />
                    <span className="font-semibold text-[#6BD0E0]">10% off boarding</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#6BD0E0] shrink-0" />
                    <span>No breed restrictions</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Visits redeemable for daycare only. Boarding at discounted member rate.</p>
                </div>
              </CardContent>
            </Card>

            {/* 8x Per Month Plan */}
            <Card className="relative bg-white border-[#00A7B5]/30 overflow-hidden group hover:border-[#00A7B5]/60 transition-all shadow-sm" data-testid="card-8x-plan">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A7B5] to-[#A7D934]"></div>
              <div className="absolute top-4 right-4">
                <span className="bg-[#A7D934] text-black text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00A7B5]/20 flex items-center justify-center">
                    <Heart size={24} className="text-[#00A7B5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">8x Per Month</h3>
                    <p className="text-gray-400 text-sm">Full Pack Member</p>
                  </div>
                </div>

                {/* Tiered Pricing */}
                <div className="mb-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00A7B5] mb-3">Prelaunch Pricing Tiers</p>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#00A7B5]/10 border border-[#00A7B5]/20">
                    <div className="flex items-center gap-2">
                      <Crown size={14} className="text-[#A7D934]" />
                      <span className="text-sm font-semibold text-gray-900">First 50 Members</span>
                    </div>
                    <span className="text-2xl font-black text-[#A7D934]">$349<span className="text-sm font-normal text-gray-400">/mo</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-[#00A7B5]" />
                      <span className="text-sm font-semibold text-gray-900">Next 50 Members</span>
                    </div>
                    <span className="text-2xl font-black text-gray-900">$369<span className="text-sm font-normal text-gray-400">/mo</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">Next 50 Members</span>
                    </div>
                    <span className="text-2xl font-black text-gray-900">$389<span className="text-sm font-normal text-gray-400">/mo</span></span>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#00A7B5] shrink-0" />
                    <span>8 daycare visits per month</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#00A7B5] shrink-0" />
                    <span>Pack-based play groups by size & temperament</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#00A7B5] shrink-0" />
                    <span className="font-semibold text-[#00A7B5]">20% off boarding</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 size={16} className="text-[#00A7B5] shrink-0" />
                    <span>No breed restrictions</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Visits redeemable for daycare only. Tiered pricing rewards early joiners during prelaunch.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Membership Revenue Preview */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8" data-testid="card-membership-calculator">
              <h3 className="text-center text-lg font-bold text-white mb-2">Prelaunch Membership Revenue Preview</h3>
              <p className="text-center text-sm text-gray-400 mb-8">Adjust the mix to see projected monthly recurring revenue per location.</p>

              {/* Mini Calculator */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <PawPrint size={14} className="text-[#6BD0E0]" />
                      2x/Month Members
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-2x-members-value">{twoXMembers}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={twoXMembers}
                    onChange={(e) => setTwoXMembers(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#6BD0E0]"
                    data-testid="slider-2x-members"
                  />
                  <p className="text-xs text-gray-600 mt-2">${TWO_X_PRICE}/month each</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Heart size={14} className="text-[#00A7B5]" />
                      8x/Month Members
                    </label>
                    <span className="text-2xl font-black text-white" data-testid="text-8x-members-value">{eightXMembers}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={eightXMembers}
                    onChange={(e) => setEightXMembers(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00A7B5]"
                    data-testid="slider-8x-members"
                  />
                  <div className="flex gap-3 mt-2 text-xs text-gray-600">
                    {tier1Count > 0 && <span className="text-[#A7D934]">{tier1Count} @ $349</span>}
                    {tier2Count > 0 && <span>· {tier2Count} @ $369</span>}
                    {tier3Count > 0 && <span>· {tier3Count} @ $389</span>}
                  </div>
                </div>
              </div>

              {/* Revenue Output */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                  <div className="text-gray-500 text-xs font-bold uppercase mb-1">2x Revenue</div>
                  <div className="text-xl font-black text-[#6BD0E0]" data-testid="text-2x-revenue">{formatMoney(twoXRevenue)}</div>
                  <div className="text-xs text-gray-600">/month</div>
                </div>
                <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                  <div className="text-gray-500 text-xs font-bold uppercase mb-1">8x Revenue</div>
                  <div className="text-xl font-black text-[#00A7B5]" data-testid="text-8x-revenue">{formatMoney(eightXRevenue)}</div>
                  <div className="text-xs text-gray-600">/month</div>
                </div>
                <div className="text-center p-4 bg-neutral-800/50 rounded-xl">
                  <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Monthly</div>
                  <div className="text-xl font-black text-white" data-testid="text-total-monthly">{formatMoney(totalMonthlyRevenue)}</div>
                  <div className="text-xs text-gray-600">/month</div>
                </div>
                <div className="text-center p-4 bg-[#00A7B5]/10 rounded-xl border border-[#00A7B5]/20">
                  <div className="text-gray-500 text-xs font-bold uppercase mb-1">Annual</div>
                  <div className="text-xl font-black text-[#A7D934]" data-testid="text-annual-revenue">{formatMoney(totalAnnualRevenue)}</div>
                  <div className="text-xs text-gray-600">/year</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  <span className="text-white font-semibold">{totalMembers} total members</span> generating{' '}
                  <span className="text-[#00A7B5] font-semibold">{formatMoney(totalMonthlyRevenue)}/month</span> in recurring revenue before you open.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section className="py-12 px-6 bg-[#f2f6f5]" data-testid="section-calculator">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading text-gray-900" data-testid="text-calculator-title">Per-Location ROI. Proven at Scale.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto" data-testid="text-calculator-subtitle">Each location is its own investment. See the numbers.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">

            {/* INPUTS (Left Side) */}
            <div className="lg:col-span-5 space-y-5">

              {/* Slider 1: Location Openings */}
              <Card className="bg-white border-gray-200 border-l-4 border-l-[#00A7B5] shadow-sm" data-testid="card-slider-studios">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Building2 size={14} className="text-[#00A7B5]" />
                      Location Openings
                    </label>
                    <span className="text-2xl font-black text-gray-900" data-testid="text-studios-value">{locationOpenings}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={locationOpenings}
                    onChange={(e) => setLocationOpenings(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00A7B5]"
                    data-testid="slider-studios"
                  />
                  {isVolumeDiscount && (
                    <p className="text-xs text-[#00A7B5] mt-2 font-semibold">10+ locations: {formatMoney(VOLUME_FEE)}/location</p>
                  )}
                </CardContent>
              </Card>

              {/* Members per Location (derived from membership sliders) */}
              <Card className="bg-white border-gray-200 shadow-sm" data-testid="card-slider-members">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Users size={14} className="text-[#00A7B5]" />
                      Members per Location
                    </label>
                    <span className="text-2xl font-black text-gray-900" data-testid="text-members-value">{membersAcquired}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Driven by membership mix above. Guarantee: {MEMBER_GUARANTEE}. Refund if under.</p>
                </CardContent>
              </Card>

              {/* Marketing Spend (Fixed) */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm" data-testid="card-marketing-spend">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Megaphone size={14} className="text-[#00A7B5]" />
                    Marketing Spend (Required)
                  </label>
                  <span className="text-2xl font-black text-gray-900" data-testid="text-marketing-value">{formatMoney(MARKETING_SPEND)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Paid by franchisee. Required for 100-member guarantee. Generates {COMMUNITY_LEADS}+ community-driven leads.</p>
              </div>

              {/* Avg Monthly Value (derived from membership sliders) */}
              <Card className="bg-white border-gray-200 shadow-sm" data-testid="card-slider-monthly">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <DollarSign size={14} className="text-[#00A7B5]" />
                      Avg Monthly Value / Member
                    </label>
                    <span className="text-2xl font-black text-gray-900" data-testid="text-monthly-value">{formatMoney(monthlyValue)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Weighted average from membership mix above.</p>
                </CardContent>
              </Card>

              {/* Slider: Lifetime Months */}
              <Card className="bg-white border-gray-200 shadow-sm" data-testid="card-slider-lifetime">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3 gap-4 flex-wrap">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Avg Member Lifetime</label>
                    <span className="text-2xl font-black text-gray-900" data-testid="text-lifetime-value">{lifetimeMonths} <span className="text-sm font-normal text-gray-400">mo</span></span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="24"
                    step="1"
                    value={lifetimeMonths}
                    onChange={(e) => setLifetimeMonths(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00A7B5]"
                    data-testid="slider-lifetime"
                  />
                </CardContent>
              </Card>
            </div>

            {/* OUTPUTS (Right Side) */}
            <div className="lg:col-span-7 flex flex-col gap-5">

              {/* PER-LOCATION ROI (Primary) */}
              <Card className="border-[#00A7B5]/30 bg-white relative overflow-hidden shadow-sm" data-testid="card-studio-roi">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A7B5] opacity-[0.03] blur-[60px] rounded-full pointer-events-none"></div>
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6">Per-Location Economics</h3>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-1">Revenue</div>
                      <div className="text-2xl font-black text-gray-900" data-testid="text-revenue-per-studio">
                        {formatMoney(revenuePerStudio)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-1">Investment</div>
                      <div className="text-2xl font-black text-gray-500" data-testid="text-investment-per-studio">
                        {formatMoney(totalStudioInvestment)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-1">ROI Multiple</div>
                      <div className="text-2xl font-black text-[#A7D934]" data-testid="text-roi-multiple">
                        {roiMultiple.toFixed(1)}x
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Revryze Fee</span>
                      <span>{formatMoney(effectiveFee)}</span>
                    </div>
                    {isGuaranteeActive && (
                      <div className="flex justify-between text-[#00A7B5]">
                        <span>Guarantee Refund ({(refundPercent * 100).toFixed(0)}%)</span>
                        <span>-{formatMoney(refundAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Marketing Spend</span>
                      <span>{formatMoney(MARKETING_SPEND)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                      <span>Net Investment</span>
                      <span>{formatMoney(totalStudioInvestment)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CORPORATE ROYALTY (Secondary) */}
              <Card className="flex-1 border-gray-200 bg-white relative overflow-hidden shadow-sm" data-testid="card-royalty-output">
                <CardContent className="p-6">
                  <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">HQ Royalty Upside</h3>
                  <p className="text-xs text-gray-400 mb-6">Franchisees pay all fees. HQ earns 7% royalty on revenue.</p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-2">Royalty per Location</div>
                      <div className="text-3xl font-black text-[#00A7B5]" data-testid="text-royalty-per-studio">
                        {formatMoney(royaltyPerStudio)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-[#00A7B5]/10 rounded-xl border border-[#00A7B5]/20">
                      <div className="text-gray-400 text-xs font-bold uppercase mb-2">Total HQ Royalty</div>
                      <div className="text-3xl font-black text-[#A7D934]" data-testid="text-total-royalty">
                        {formatMoney(totalHQRoyalty)}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{locationOpenings} locations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Box */}
              <div
                className="p-5 rounded-2xl border flex items-center gap-4 transition-all bg-white border-gray-200 shadow-sm"
                data-testid="status-box"
              >
                <div className="p-3 rounded-full bg-[#00A7B5]/20 text-[#00A7B5]">
                  {isGuaranteeActive ? <ShieldCheck size={24} /> : <TrendingUp size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900" data-testid="text-status-title">
                    {isGuaranteeActive ? 'Guarantee Active' : 'At or Above Target'}
                  </h4>
                  <p className="text-sm text-gray-500 mt-0.5" data-testid="text-status-desc">
                    {isGuaranteeActive
                      ? `${membersAcquired} members = ${(refundPercent * 100).toFixed(0)}% refund on Revryze fee.`
                      : `${membersAcquired} members per location. No refund needed.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF VAULT */}
      <section className="py-20 px-4 bg-white border-t border-gray-100" data-testid="section-proof">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-heading text-gray-900" data-testid="text-proof-title">Real Results. Real Calls.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto" data-testid="text-proof-subtitle">Listen to live sales. See the case studies.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/swet-call-to-share.wav" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-listen-call">
              <Card className="h-full bg-white border-gray-200 group-hover:bg-gray-50 transition-all hover:-translate-y-1 hover:border-[#00A7B5]/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-[#00A7B5]/10 rounded-full flex items-center justify-center mb-6 text-[#00A7B5] group-hover:scale-110 transition-transform">
                    <PhoneCall size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900" data-testid="text-listen-title">Live Sales Call</h4>
                  <p className="text-gray-500 text-sm" data-testid="text-listen-desc">Hear real-time lead conversion.</p>
                </CardContent>
              </Card>
            </a>

            <a href="/Case-Study-Building-Predictable-Franchise-Growth-copy.pdf" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-beem-case">
              <Card className="h-full bg-white border-gray-200 group-hover:bg-gray-50 transition-all hover:-translate-y-1 hover:border-[#00A7B5]/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-[#00A7B5]/10 rounded-full flex items-center justify-center mb-6 text-[#00A7B5] group-hover:scale-110 transition-transform">
                    <FileText size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900" data-testid="text-beem-title">Franchise Growth Study</h4>
                  <p className="text-gray-500 text-sm" data-testid="text-beem-desc">Predictable multi-location growth.</p>
                </CardContent>
              </Card>
            </a>

            <a href="/attached_assets/Swet-Studio-Recovery-Relaunch-2025.pdf" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-swet-case">
              <Card className="h-full bg-white border-gray-200 group-hover:bg-gray-50 transition-all hover:-translate-y-1 hover:border-[#00A7B5]/50 shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-[#00A7B5]/10 rounded-full flex items-center justify-center mb-6 text-[#00A7B5] group-hover:scale-110 transition-transform">
                    <BarChart3 size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900" data-testid="text-swet-title">Presale Case Study</h4>
                  <p className="text-gray-500 text-sm" data-testid="text-swet-desc">From 40 to 170+ members in 60 days.</p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6 bg-[#00A7B5] text-white" data-testid="section-pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-white font-heading" data-testid="text-pricing-title">100 Members. Guaranteed.</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Prorated refund if we miss. No risk for HQ.</p>
          </div>

          {/* Qualification Requirements */}
          <div className="mb-8 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-white font-bold text-center uppercase tracking-widest text-sm mb-4">To Qualify</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 text-white/90">
                <Megaphone size={16} className="text-[#A7D934] shrink-0" />
                <span>{formatMoney(MARKETING_SPEND)} marketing spend commitment</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Users size={16} className="text-[#A7D934] shrink-0" />
                <span>{COMMUNITY_LEADS} community-driven leads (dog owners interested in daycare)</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Standard Rate */}
            <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col" data-testid="card-standard-pricing">
              <div className="mb-6">
                <span className="bg-neutral-200 text-neutral-600 text-xs font-bold px-3 py-1 rounded-full uppercase" data-testid="badge-standard">Standard</span>
                <h3 className="text-4xl font-black mt-4 mb-1 text-black" data-testid="text-standard-price">{formatMoney(STANDARD_FEE)}</h3>
                <p className="text-gray-500 text-sm font-bold" data-testid="text-standard-desc">Per Location (Franchisee Pays)</p>
              </div>
              <div className="mt-auto space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-400" />
                  <span>100-member guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-400" />
                  <span>Prorated refund protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gray-400" />
                  <span>Dedicated US-based sales team</span>
                </div>
              </div>
            </div>

            {/* Volume Rate */}
            <div className="bg-neutral-900 p-8 rounded-3xl shadow-2xl flex flex-col text-white ring-4 ring-white/20" data-testid="card-volume-pricing">
              <div className="mb-6">
                <span className="bg-[#A7D934] text-black text-xs font-bold px-3 py-1 rounded-full uppercase" data-testid="badge-volume">10+ Locations</span>
                <h3 className="text-4xl font-black mt-4 mb-1 text-[#A7D934]" data-testid="text-volume-price">{formatMoney(VOLUME_FEE)}</h3>
                <p className="text-gray-400 text-sm font-bold" data-testid="text-volume-desc">Per Location (Franchisee Pays)</p>
              </div>
              <div className="mt-auto space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A7D934]" />
                  <span>20% savings per location</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A7D934]" />
                  <span>Same 100-member guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#A7D934]" />
                  <span>Priority deployment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 bg-black/20 p-8 rounded-3xl backdrop-blur-sm border border-white/10 text-center" data-testid="card-guarantee-explainer">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight font-heading">NO RESULTS = NO MONEY KEPT.</h3>
            <p className="text-white/90 text-lg leading-relaxed max-w-xl mx-auto">
              100 members per location or dollar-for-dollar refund.<br />
              Revenue created. Royalties earned.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 text-center px-4 bg-white" data-testid="section-footer">
        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2" data-testid="text-footer-company">Growth Point Solutions LLC dba Revryze</p>
        <p className="text-gray-400 text-xs" data-testid="text-footer-confidential">Proprietary and Confidential. Hounds Town USA HQ Leadership Only.</p>
      </footer>
    </div>
  );
}
