import React from 'react';

import PageSection from 'components/sections/page'
import ProfileEditForm from 'components/formik/profileEdit'

function EditProfile() {
    return (
        <PageSection>
            <div className="max-w-[850px] m-auto">
                <h2 className='mb-5 text-2xl font-bold'>Update your profile here!</h2>
                <ProfileEditForm />
            </div>
        </PageSection>
    )
}

export default EditProfile
