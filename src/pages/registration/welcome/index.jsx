import React from 'react';
import PageSection from 'components/sections/page';
import GradientText from 'components/animations/texts/gradient';
import PrimaryLink from 'components/links/primary';

// Reusable component for feature sections
const FeatureSection = ({ title, description, imageSrc, reverse = false }) => (
    <PageSection customCss={`lg:min-h-[80vh] py-5 grid grid-cols-6 gap-4 md:grid-cols-12`}>
        <div className='order-2 col-span-6 flex-center'>
            <img src={imageSrc} alt={title} className='max-h-[300px] lg:max-h-[400px]' />
        </div>
        <div className={`order-last col-span-6 flex-center flex-col text-center ${reverse ? 'md:order-1 md:items-end md:text-right' : 'md:order-3 md:items-start md:text-left'}`}>
            <h2 className='font-bold text-xl md:text-[28px] mb-4'>
                <GradientText>{title}</GradientText>
            </h2>
            <p className='max-w-[500px]'>
                {description}
            </p>
        </div>
    </PageSection>
);

function Welcome() {
    return (
        <div>
            <PageSection customCss="flex-center min-h-[80vh]">
                <div className='flex flex-col items-center text-center'>
                    <h2 className='text-[30px] md:text-[45px] font-bold text-green-600'>
                        <GradientText>Welcome to Kanakku!</GradientText>
                    </h2>
                    <p className='font-medium text-lg mt-1'>Transform Your Manual Accounting into a Digital Masterpiece</p>
                    <img src="/images/vectors/welcome.png" alt="Welcome to Kanakku" className='max-h-[250px] mt-3 object-contain' />
                    <PrimaryLink to="/signup" customCss='text-lg font-bold text-blue-700 underline'>Register Now</PrimaryLink>
                </div>
            </PageSection>
            <div>
                <h2 className='text-center text-green-700 font-bold text-[28px]'>Our Features</h2>
            </div>
            <FeatureSection
                title="Multiple Accounts for One Email"
                description="Manage different income and expense accounts with one email. Easily switch between accounts and keep your finances organized and secure."
                imageSrc="/images/gif/multi-account.gif"
            />

            <FeatureSection
                title="Transaction Management"
                description="Record transactions for any of your accounts quickly. Keep your spending and income up-to-date with a simple, user-friendly interface."
                imageSrc="/images/gif/transactions.gif"
                reverse
            />

            <FeatureSection
                title="Event-Based Expense Tracking"
                description="Track expenses for specific events like trips or festivals. Create separate accounts for each event to see exactly how much you’re spending."
                imageSrc="/images/gif/events.gif"
            />
            <FeatureSection
                title="Group Expense Splitting"
                description="Share and split expenses with friends or family. Easily calculate each person’s share for group activities and ensure fair distribution."
                imageSrc="/images/gif/groups.gif"
                reverse
            />
            <br />
        </div>
    );
}

export default Welcome;