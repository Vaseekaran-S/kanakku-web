import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'components/cards';
import Avatar from "react-avatar";
import { MdEventNote, MdAccountBalanceWallet, MdAccountBalance } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { HiUserGroup } from 'react-icons/hi2';

import { FaCirclePlus } from "react-icons/fa6";
import ProfileTable from 'components/sections/profile';

const profileTableData = {
  accounts: {
    title: "Accounts",
    link: "accounts",
    icon: <MdAccountBalance fontSize={35} />
  },
  events: {
    title: "Events",
    link: "events",
    icon: <MdEventNote fontSize={35} />
  },
  groups: {
    title: "Groups",
    link: "groups",
    icon: <HiUserGroup fontSize={35} />
  },
}

function Profile() {
  const { name, email, mobile } = useSelector(state => state.user.userData);

  const profileDetails = [
    { icon: <FaPhoneAlt />, text: mobile },
    { icon: <MdAccountBalanceWallet />, text: `Accounts - ${0}` },
    { icon: <MdEventNote />, text: `Events - ${0}` },
    { icon: <HiUserGroup />, text: `Groups - ${0}` },
  ];

  return (
    <div className='py-10'>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 lg:col-span-3 sm:flex sm:mx-auto lg:w-full lg:block relative">
          <Card customCss="sticky top-[20px] lg:w-full">
            <div className="text-center">
              <Avatar
                name={name}
                title="Profile"
                className="max-h-[40px] max-w-[40px] lg:max-h-[90px] lg:max-w-[90px] lg:text-2xl rounded-full font-bold"
              />
              <p className='font-bold mb-0 mt-2'>{name}</p>
              <p className='text-[11px]'>{email}</p>
            </div>
            <div className='flex-center flex-col mt-3'>
              <div>
                {profileDetails.map((detail, index) => (
                  <div key={index} className='flex items-center gap-1 mt-2'>
                    {detail.icon} {detail.text}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <Card customCss="hover:shadow-md px-8 py-2 divide-y">
            <ProfileTable data={profileTableData.accounts} />
            <ProfileTable data={profileTableData.events} />
            <ProfileTable data={profileTableData.groups} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
