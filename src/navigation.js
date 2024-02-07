import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { SITE } from '~/utils/config';
export const headerData = {
  links: [
    {
      text: 'หน้าหลัก',
      href: '/',
    },
    {
      text: 'คอร์สเรียนฟรีไดฟ์',
      links: [
        { text: 'คอร์สเรียนทั้งหมด',
          href: getPermalink('/courses-and-training'),
        },
        {
          text: 'คอร์ส Lap1/Wave1',
          href: getPermalink('/courses-and-training/beginner-course-lap1-wave1'),
        },
        {
          text: 'คอร์ส Lap2/Wave2',
          href: getPermalink('/courses-and-training/intermediate-course-lap2-wave2'),
        },
        {
          text: 'ทดลองเรียนฟรีไดฟ์',
          href: getPermalink('/courses-and-training/try-freedive'),
        },
        {
          text: 'Private Pool Training',
          href: getPermalink('/courses-and-training/private-pool-training'),
        },
      ],
    },
    {
      text: 'รู้จักครูผู้สอน',
      href: 'meet-your-instructors'
    },
    // {
    //   text: 'รูปภาพ',
    //   href: getPermalink('/gallery')
    // },
    {
      text: 'สระที่ใช้สอน',
      href: getPermalink('/pool-location')
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'สมัครเรียน', href: SITE.contact.line, target: '_blank', icon:'Line-logo' }],
};

export const footerData = {
  links: [
    {
      title: 'คอร์สเรียนฟรีไดฟ์',
      links: [
        { text: 'ทั้งหมด',
          href: getPermalink('/courses-and-training'),
        },
        {
          text: 'คอร์ส Lap1/Wave1',
          href: getPermalink('/beginner-course-lap1-wave1'),
        },
        {
          text: 'คอร์ส Lap2/Wave2',
          href: getPermalink('/intermediate-course-lap2-wave2'),
        },
        {
          text: 'ทดลองเรียนฟรีไดฟ์',
          href: getPermalink('/try-freedive'),
        },
        {
          text: 'Private Pool Training',
          href: getPermalink('/private-pool-training'),
        },
      ],
    },
    {
      title: 'อื่นๆ',
      links: [
        { text: 'ครูผ้สอนทั้งหมด', href: getPermalink('/meet-your-instructors') },
        {text: 'สระที่ใช้สอน', href: getPermalink('/pool-location')}

      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Youtube', icon: 'tabler:brand-youtube', href: 'https://youtube.com/@bradycardia5951' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/pracha_freediver' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://web.facebook.com/beluga.freediving.th' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm"></span>
    Beluga Freediving · All rights reserved.
  `,
};
