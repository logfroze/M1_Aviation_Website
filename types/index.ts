export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface VisionMilestone {
  year: string;
  statement: string;
}

export interface Partner {
  id: string;
  name: string;
  tagline: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  accentColor: string;
  thumbBg: string;
  readTime: string;
  imageUrl?: string;
}

export interface ContactFormData {
  phone: string;
  email: string;
  fullName: string;
  reason: string;
  description: string;
}
