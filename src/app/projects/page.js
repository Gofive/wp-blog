import { projects, personalInfo } from '@/data/about-data';
import {
  generateSEOMetadata,
  generateProjectStructuredData,
} from '@/lib/seo-utils';
import Script from 'next/script';
import {
  Github,
  ExternalLink,
  Sparkles,
  Zap,
  BrainCircuit,
  Rocket,
} from 'lucide-react';

export const metadata = generateSEOMetadata({
  title: `个人项目 - ${personalInfo.name}`,
  description: `探索 ${personalInfo.name} 的核心专案与产品展示，包括基于 AI 技术构建的移动端应用 AI单词宝。`,
  path: '/projects',
  type: 'website',
});

export default function ProjectsPage() {
  const project = projects.find((p) => p.id === 'ai-vocab');

  if (!project) return null;

  const { title, technologies, links, icon, screenshots } = project;
  const { github, demo } = links || {};

  // 生成项目结构化数据
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [generateProjectStructuredData(project)],
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Script
        id="projects-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          个人产品集
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mx-auto md:mx-0">
          下面为您展示我独立设计、开发并成功上线的核心产品项目，涵盖了从理念构思到全栈开发落地的完整过程。
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Header Section */}
        <div className="p-8 md:p-12 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 dark:opacity-5 pointer-events-none">
            <BrainCircuit className="w-96 h-96 text-blue-600" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {icon && (
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 bg-white flex-shrink-0"
                />
              )}
              <div className="flex flex-col justify-center pt-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                  {title}
                </h2>
                {technologies && technologies.length > 0 && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4 md:mt-0">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium text-sm">SourceCode</span>
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-medium text-sm">项目地址</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 w-full">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overview */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                关于项目
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-loose">
                <b>AI单词宝</b>{' '}
                是一款基于前沿大语言模型与科学认知算法打造的跨平台智能英语学习应用。产品旨在打破传统单词死记硬背的低效模式，通过结合最新深度学习框架的{' '}
                <b>FSRS 记忆算法</b>，为每位用户计算个性化的遗忘曲线临界点。配合
                AI 深度介入的<b>词根助记解析</b>与<b>动态例句生成的场景发音</b>
                ，带来前所未有的全景化语言习得体验。
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-loose mt-4">
                从底层的 SQLite
                数据抽象设计、高并发算法队列的时间度量流转，到上层流畅舒适的卡片交互反馈，它凝结了极致的产品体验打磨。在商业化设计方面，产品搭建了极具健壮性的高可用后端验证体系，并优雅支持了{' '}
                <b>In-App Purchases</b>，<b>微信/支付宝</b>
                等闭环支付，实现了全链路 VIP 会员体系。
              </p>
            </div>

            {/* Application Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-5">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  核心算法跃迁
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  全面拥抱开源社区前沿成果，采用最先进的自然语言和深度学习
                  FSRS（Free Spaced Repetition Scheduler）
                  核心复习算法进行记忆预测调度。能够极其自适应、超精准地动态规划记忆序列，不再浪费时间复习早该跳过的单词。
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  AI 原生赋能
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  摆脱刻板生硬的英汉互译。通过大模型提炼核心用法、同源词及谐音助记法。实现基于实际语境上下文的短语发音解析，每一次学习都像在进行一场沉浸式母语对话。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Section */}
        {screenshots && screenshots.length > 0 && (
          <div className="bg-slate-50/80 dark:bg-[#080d1a]/80 p-8 md:p-12 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center md:text-left">
                极简专注的界面设计
              </h3>

              {/* Screenshot scroller */}
              <div className="w-full overflow-x-auto pb-6 custom-scrollbar scroll-smooth snap-x snap-mandatory">
                <div className="flex gap-6 w-max px-2">
                  {screenshots.map((src, idx) => (
                    <div key={idx} className="snap-center relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 opacity-20 group-hover:opacity-40 rounded-[2rem] transition-opacity blur-md scale-105 -z-10"></div>
                      <img
                        src={src}
                        alt={`${title} App Screen ${idx + 1}`}
                        className="h-[520px] w-auto rounded-[2rem] shadow-xl border-[6px] border-slate-900/5 dark:border-white/5 object-cover transform hover:-translate-y-2 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
