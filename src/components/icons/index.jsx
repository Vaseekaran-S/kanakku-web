import React from 'react'
import { RiSignalWifiErrorLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function IconLink({ title, link, customCss, Icon = RiSignalWifiErrorLine }) {
  return (
    <Link title={title} to={link} className={`block border rounded flex-center p-1 hover:bg-gray-200 ${customCss}`}>
        <Icon />
    </Link>
  )
}

export default IconLink
