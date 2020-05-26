import React, { useState } from 'react';
import { Dialog, Paragraph, Link } from 'evergreen-ui'


const PP = () => (
  <>
    <Paragraph marginBottom={10}>Your privacy is important to us. It is Weathered Strip's policy to respect your privacy regarding any information we may collect from you across our website, <Link href="https://www.weatheredstrip.com">https://www.weatheredstrip.com</Link>, and other sites we own and operate.</Paragraph>
    <Paragraph marginBottom={10}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</Paragraph>
    <Paragraph marginBottom={10}>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</Paragraph>
    <Paragraph marginBottom={10}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</Paragraph>
    <Paragraph marginBottom={10}>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</Paragraph>
    <Paragraph marginBottom={10}>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</Paragraph>
    <Paragraph marginBottom={10}>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</Paragraph>
    <Paragraph marginBottom={10}>This policy is effective as of 21 May 2020.</Paragraph>
    <Paragraph marginBottom={10}><Link href="https://getterms.io" title="Generate a free privacy policy">Privacy Policy created with GetTerms.</Link></Paragraph>
  </>
)

const PrivacyPolicyDialog = ({ isShown, onCloseComplete }) => (
  <Dialog
    title="Privacy Policy"
    isShown={isShown}
    hasCancel={false}
    confirmLabel="Close"
    onCloseComplete={onCloseComplete}
  >
    <PP />
  </Dialog>
)

const PrivacyPolicyDialogLink = () => {
  const [isShown, setShown] = useState(false)

  return (
    <>
      <PrivacyPolicyDialog isShown={isShown} onCloseComplete={() => setShown(false)}/>
      <Link href="#" onClick={() => setShown(true)}>Privacy Policy</Link>
    </>
  )
}


export { PrivacyPolicyDialog, PrivacyPolicyDialogLink }