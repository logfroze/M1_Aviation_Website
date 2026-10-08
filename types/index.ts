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

export interface ArticleSection {
  heading?: string;
  subheading?: string;
  quote?: string;
  content: string[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface Article {
  id: string;
  editionNumber?: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  accentColor: string;
  thumbBg: string;
  readTime: string;
  imageUrl?: string;
  sections?: ArticleSection[];
}

export interface ContactFormData {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  whatsappSignal: string;
  objective: string;
  description: string;
}
