'use client';

import React, { useState, useEffect } from 'react';

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

interface ProductReviewsSectionProps {
  productId: number;
  productName: string;
  rating: number;
  totalReviews: number;
}

export function ProductReviewsSection({
  productId,
  productName,
  rating,
  totalReviews,
}: ProductReviewsSectionProps) {
  const storageKey = `beso_reviews_${productId}`;

  // Default seed reviews
  const defaultReviews: ReviewItem[] = [
    {
      id: `r-${productId}-1`,
      name: 'Dr. Vivek Menon',
      role: 'Spine Ergonomist, Bengaluru',
      rating: 5,
      date: '2 weeks ago',
      title: 'Remarkable lumbar contour and synchro tilt',
      comment: `Installed the ${productName} for our research lab. The double-layer mesh tension distribution relieves lower back compression remarkably well during 8+ hour continuous computing sessions.`,
      verified: true,
      helpfulCount: 24,
    },
    {
      id: `r-${productId}-2`,
      name: 'Priyanka Sundaram',
      role: 'Creative Director, Indiranagar',
      rating: 5,
      date: '1 month ago',
      title: 'Premium build quality that outshines imported brands',
      comment: `Visited the Indiranagar flagship showroom and tried several options. The solid construction, quiet mechanics, and clean aesthetic make this piece exceptional value for money.`,
      verified: true,
      helpfulCount: 18,
    },
    {
      id: `r-${productId}-3`,
      name: 'Aditya Kulkarni',
      role: 'Software Architect, Hyderabad',
      rating: 4,
      date: '2 months ago',
      title: 'Sturdy, comfortable, seamless delivery',
      comment: `White-glove assembly was done within 48 hours of dispatch. Adjustments for armrest width and seat depth are intuitive and firm. Highly recommend.`,
      verified: true,
      helpfulCount: 11,
    },
  ];

  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(defaultReviews);
  const [formOpen, setFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form states
  const [formRating, setFormRating] = useState(5);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      role: formRole.trim() || 'Verified Customer',
      rating: formRating,
      date: 'Just now',
      title: formTitle.trim() || 'Exceptional Ergonomics',
      comment: formComment.trim(),
      verified: true,
      helpfulCount: 1,
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Reset form
    setFormName('');
    setFormRole('');
    setFormTitle('');
    setFormComment('');
    setFormRating(5);
    setFormOpen(false);
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 6000);
  };

  return (
    <section id="reviews" className="mt-20 border-t border-line/10 pt-16 space-y-12">
      {/* ─── Header & Write a Review CTA ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
            Customer Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
            Reviews &amp; Ratings for {productName}
          </h2>
          <p className="text-ink/50 text-sm mt-1">
            Real experiences from verified homeowners, designers, and corporate workspace buyers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFormOpen((prev) => !prev)}
          className="self-start md:self-auto px-6 py-3 rounded-full bg-ink text-app text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md flex items-center gap-2"
        >
          <span>✍️</span>
          <span>{formOpen ? 'Close Review Form' : 'Write a Review'}</span>
        </button>
      </div>

      {/* ─── Success Notification ─── */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-between text-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-accent text-onAccent flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span>
              <strong>Thank you!</strong> Your review for {productName} has been published successfully.
            </span>
          </div>
          <button
            onClick={() => setSuccessMsg(false)}
            className="text-xs font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ─── Interactive Write Review Form Modal / Accordion ─── */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-surfaceSubtle border border-line/15 space-y-6 animate-fade-in shadow-xl"
        >
          <div className="border-b border-line/10 pb-4">
            <h3 className="text-lg font-bold text-ink">Share your experience</h3>
            <p className="text-xs text-ink/50 mt-0.5">
              Help other customers choose the right ergonomics for their workspace.
            </p>
          </div>

          <div className="space-y-4">
            {/* Rating Star Picker */}
            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1.5">
                Overall Rating: <span className="text-amber-500 font-bold">{formRating} / 5 Stars</span>
              </label>
              <div className="flex items-center gap-1.5 text-2xl text-amber-500 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                    aria-label={`Rate ${star} star`}
                  >
                    {star <= formRating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Role */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Anand R."
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Designation / City
                </label>
                <input
                  type="text"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="e.g. Design Director, Bengaluru"
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1">
                Review Headline
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Excellent lumbar support for long working sessions"
                className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={4}
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                placeholder="Describe the posture comfort, build quality, assembly, and how it performs in your daily work..."
                className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-5 py-2.5 rounded-full border border-line/15 text-xs font-semibold text-ink/70 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-ink text-app text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* ─── Aggregate Rating Overview ─── */}
      <div className="grid md:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-surface border border-line/10">
        <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-line/10 pb-6 md:pb-0 md:pr-8">
          <div className="text-5xl sm:text-6xl font-black text-ink tracking-tight">
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 text-lg">
            {'★'.repeat(Math.floor(rating))}
            {rating % 1 !== 0 && '★'}
          </div>
          <p className="text-xs text-ink/50">
            Based on {reviewsList.length} verified customer reviews
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent font-bold text-[10px] tracking-wider uppercase border border-accent/25">
              96% Recommended by Buyers
            </span>
          </div>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-8 space-y-2.5">
          {[
            { stars: '5 Star', pct: '82%' },
            { stars: '4 Star', pct: '14%' },
            { stars: '3 Star', pct: '3%' },
            { stars: '2 Star', pct: '1%' },
            { stars: '1 Star', pct: '0%' },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-ink/60 font-medium">{bar.stars}</span>
              <div className="flex-1 h-2 rounded-full bg-surfaceSubtle overflow-hidden relative">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: bar.pct }}
                />
              </div>
              <span className="w-8 text-right text-ink/50 font-mono text-[11px]">
                {bar.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── List of Verified Reviews ─── */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-surface border border-line/8 hover:border-line/15 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/15 text-accent font-bold text-xs flex items-center justify-center">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-ink">{rev.name}</h4>
                    <span className="text-[11px] text-ink/40">{rev.role}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-0.5 text-amber-500 text-sm">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </div>
                <span className="text-[10px] text-ink/40">{rev.date}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-sm text-ink">{rev.title}</h5>
                {rev.verified && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold border border-accent/25">
                    ✓ Verified Buyer
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                {rev.comment}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-line/6 text-[11px] text-ink/40">
              <span>Was this review helpful?</span>
              <button
                type="button"
                className="hover:text-ink font-semibold transition-colors flex items-center gap-1"
              >
                <span>👍 Helpful</span>
                <span>({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
