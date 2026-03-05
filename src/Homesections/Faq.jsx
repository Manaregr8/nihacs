"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CyberSecurityFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Two-Factor Authentication and Why is it Essential?",
      answer: "Two-Factor Authentication (2FA) is a security process that requires two different authentication factors to verify your identity. It combines something you know (password) with something you have (phone, security key) or something you are (biometric). This significantly reduces the risk of unauthorized access, even if your password is compromised. Studies show that 2FA can prevent up to 99.9% of automated cyberattacks."
    },
    {
      question: "How Can I Protect My Business from Ransomware Attacks?",
      answer: "Protecting against ransomware requires a multi-layered approach: implement regular automated backups stored offline, keep all systems and software updated, use endpoint detection and response (EDR) solutions, train employees to recognize phishing attempts, segment your network to limit lateral movement, maintain robust access controls, and develop an incident response plan. Regular security audits and penetration testing can identify vulnerabilities before attackers exploit them."
    },
    {
      question: "What Are the Most Common Cybersecurity Threats in 2025?",
      answer: "The cybersecurity landscape continues to evolve with AI-powered phishing attacks, supply chain vulnerabilities, cloud security breaches, zero-day exploits, insider threats, and sophisticated social engineering. Ransomware-as-a-Service (RaaS) has made attacks more accessible to criminals. Mobile device compromises and IoT vulnerabilities are increasing. Deepfake technology is being used for fraud and manipulation. Organizations must stay vigilant and adopt proactive security measures."
    },
    {
      question: "How Often Should I Update My Passwords?",
      answer: "Current cybersecurity best practices recommend changing passwords immediately if there's a suspected breach, rather than on a fixed schedule. Use unique, complex passwords for each account (minimum 12-16 characters with mixed case, numbers, and symbols). Password managers can generate and store these securely. Enable breach monitoring services that alert you when your credentials appear in data leaks. For high-value accounts, consider using passkeys or hardware security keys."
    },
    {
      question: "What is Zero Trust Security, Should My Company Adopt It?",
      answer: "Zero Trust is a security framework based on the principle 'never trust, always verify.' It assumes no user or device is trustworthy by default, whether inside or outside the network. Every access request is authenticated, authorized, and encrypted. Benefits include reduced attack surface, better visibility, improved compliance, and protection against insider threats. Given the rise of remote work and cloud services, Zero Trust is becoming essential for organizations of all sizes."
    },
    {
      question: "How Do I Recognize and Avoid Phishing Emails?",
      answer: "Phishing emails often exhibit red flags: sender addresses that mimic legitimate domains but have slight variations, urgent language creating false time pressure, requests for sensitive information, suspicious links (hover to preview URLs), poor grammar or formatting, unexpected attachments, and too-good-to-be-true offers. Always verify requests through official channels, use email filtering, enable link protection, and report suspicious messages. Security awareness training can reduce successful phishing by up to 80%."
    },
    {
      question: "What is the Difference Between VPN and Firewall?",
      answer: "A Virtual Private Network (VPN) encrypts your internet connection, creating a secure tunnel between your device and the internet, masking your IP address and protecting data in transit—ideal for remote workers and public Wi-Fi. A firewall monitors and controls incoming/outgoing network traffic based on security rules, acting as a barrier between trusted and untrusted networks. Both serve different purposes: VPNs protect data privacy and location, while firewalls prevent unauthorized network access. Use both for comprehensive protection."
    },
    {
      question: "How Can Small Businesses Afford Cybersecurity?",
      answer: "Small businesses can implement effective cybersecurity on a budget: use free or low-cost tools (Windows Defender, open-source solutions), leverage cloud-based security services with pay-as-you-go pricing, prioritize employee training (the most cost-effective defense), implement basic hygiene (regular updates, strong passwords, backups), consider cyber insurance, use managed security service providers (MSSPs) for 24/7 monitoring at a fraction of in-house costs, and take advantage of government resources and grants for small business cybersecurity."
    },
    {
      question: "What Should I Do Immediately After a Data Breach?",
      answer: "Act quickly to minimize damage: isolate affected systems to prevent spread, activate your incident response plan, preserve evidence for investigation, notify your cybersecurity team or managed service provider, change all compromised credentials, assess the scope and type of data affected, comply with legal notification requirements (GDPR, state laws), communicate transparently with affected parties, document everything for insurance and legal purposes, conduct a post-incident review, and implement remediation measures to prevent recurrence."
    },
    {
      question: "Are Biometric Authentication Methods Truly Secure?",
      answer: "Biometric authentication (fingerprints, facial recognition, iris scans) offers strong security because biological traits are unique and difficult to replicate. However, they're not foolproof: biometrics can't be changed if compromised, sophisticated spoofing techniques exist, privacy concerns arise from biometric data storage, and false positives/negatives occur. Best practice: use biometrics as part of multi-factor authentication rather than the sole security method. Combine with passwords or security keys for maximum protection."
    }
  ];

  const leftFAQs  = faqs.filter((_, i) => i % 2 === 0);
  const rightFAQs = faqs.filter((_, i) => i % 2 !== 0);

  const FAQItem = ({ faq, index }) => {
    const isOpen = openIndex === index;
    return (
      <div className="mb-6 group">
        <button
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="w-full text-left"
        >
          <div
            className="relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: isOpen
                ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #000 100%)'
                : 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
              boxShadow: isOpen
                ? '0 20px 40px rgba(220,38,38,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at top right, rgba(220,38,38,0.15), transparent 70%)' }}
            />
            <div className="relative flex items-center justify-between">
              <h3 className="flex-1 pr-4 text-lg font-bold text-white leading-tight">
                {faq.question}
              </h3>
              <ChevronDown
                className={`flex-shrink-0 w-6 h-6 text-red-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    /* ✅ relative so absolute children are scoped */
    <div className="relative min-h-screen bg-black text-white py-20 px-6">

      {/* ✅ Decorative bg — absolute (not fixed), pointer-events-none, z-0 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* ✅ All content sits above decorative layer */}
      <div className="relative z-10">

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-600">
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              Security Knowledge Base
            </span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black mb-6 text-white leading-tight">
            Cybersecurity FAQ
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Essential answers to protect your digital assets and understand modern security threats
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col">
            {leftFAQs.map((faq, idx) => (
              <FAQItem key={idx * 2} faq={faq} index={idx * 2} />
            ))}
          </div>
          <div className="flex flex-col">
            {rightFAQs.map((faq, idx) => (
              <FAQItem key={idx * 2 + 1} faq={faq} index={idx * 2 + 1} />
            ))}
          </div>
        </div>

        {/* ✅ CTA — pure <a> tag, no nested button */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <a
            href="/contact-us"
            className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-xl transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
          >
            Contact Security Team
          </a>
        </div>

      </div>
    </div>
  );
}