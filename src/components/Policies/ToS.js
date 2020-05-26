import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Dialog, Paragraph, Heading, OrderedList, ListItem, Link } from 'evergreen-ui'


const ToS = () => (
  <>
    <Heading>1. Terms</Heading>
    <Paragraph marginBottom={10} >By accessing the website at <Link href="https://www.weatheredstrip.com">https://www.weatheredstrip.com</Link>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</Paragraph>
    <Heading>2. Use License</Heading>
    <OrderedList listStyle="lower-alpha" marginLeft={30}>
      <ListItem>Permission is granted to temporarily download one copy of the materials (information or software) on Weathered Strip's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        <OrderedList listStyle="lower-roman" marginLeft={40}>
          <ListItem>modify or copy the materials;</ListItem>
          <ListItem>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</ListItem>
          <ListItem>attempt to decompile or reverse engineer any software contained on Weathered Strip's website;</ListItem>
          <ListItem>remove any copyright or other proprietary notations from the materials; or</ListItem>
          <ListItem>transfer the materials to another person or "mirror" the materials on any other server.</ListItem>
        </OrderedList>
      </ListItem>
      <ListItem>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Weathered Strip at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</ListItem>
    </OrderedList>
    <Heading>3. Disclaimer</Heading>
    <OrderedList listStyle="lower-alpha" marginLeft={30}>
      <ListItem>The materials on Weathered Strip's website are provided on an 'as is' basis. Weathered Strip makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</ListItem>
      <ListItem>Further, Weathered Strip does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</ListItem>
    </OrderedList>
    <Heading>4. Limitations</Heading>
    <Paragraph marginBottom={10}>In no event shall Weathered Strip or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Weathered Strip's website, even if Weathered Strip or a Weathered Strip authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</Paragraph>
    <Heading>5. Accuracy of materials</Heading>
    <Paragraph marginBottom={10}>The materials appearing on Weathered Strip's website could include technical, typographical, or photographic errors. Weathered Strip does not warrant that any of the materials on its website are accurate, complete or current. Weathered Strip may make changes to the materials contained on its website at any time without notice. However Weathered Strip does not make any commitment to update the materials.</Paragraph>
    <Heading>6. Links</Heading>
    <Paragraph marginBottom={10}>Weathered Strip has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Weathered Strip of the site. Use of any such linked website is at the user's own risk.</Paragraph>
    <Heading>7. Modifications</Heading>
    <Paragraph marginBottom={10}>Weathered Strip may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</Paragraph>
    <Heading>8. Governing Law</Heading>
    <Paragraph marginBottom={10}>These terms and conditions are governed by and construed in accordance with the laws of the Provide of Quebec, Canada and you irrevocably submit to the exclusive jurisdiction of the courts in that province.</Paragraph>
    <Paragraph marginBottom={10}><Link href="https://getterms.io" title="Generate a free terms of use document">Terms of Use created with GetTerms.</Link></Paragraph>

  </>
)

const ToSDialog = ({ isShown, onCloseComplete }) => (
  <Dialog
    title="Terms of Service"
    isShown={isShown}
    hasCancel={false}
    confirmLabel="Close"
    onCloseComplete={onCloseComplete}
  >
    <ToS />
  </Dialog>
)

const ToSDialogLink = () => {
  const [isShown, setShown] = useState(false)

  return (
    <>
      <ToSDialog isShown={isShown} onCloseComplete={() => setShown(false)}/>
      <Link href="#" onClick={() => setShown(true)}>Terms of Service</Link>
    </>
  )
}

export { ToSDialog, ToSDialogLink }