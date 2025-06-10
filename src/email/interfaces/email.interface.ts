export interface BaseEmailData {
  to: string;
  subject: string;
}

export interface ForgotPasswordEmailData extends BaseEmailData {
  type: 'forgot-password';
  resetLink: string;
}

export interface WelcomeEmailData extends BaseEmailData {
  type: 'welcome';
  firstname: string;
}

export type EmailData = ForgotPasswordEmailData | WelcomeEmailData;