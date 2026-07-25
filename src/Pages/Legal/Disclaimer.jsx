import LegalPageLayout, { useLegalProse } from '../../components/LegalPageLayout'

const Disclaimer = () => {
  const c = useLegalProse()

  return (
    <LegalPageLayout title="Disclaimer" lastUpdated="26 April 2026">
      <section>
        <h2 className={c.h2}>General information only</h2>
        <p className={c.p}>
          The information on this website is for general guidance only. It does not constitute legal, tax, or professional
          advice tailored to your situation. Laws, rules, and government portals change frequently; you should verify
          current requirements with qualified professionals or official sources before acting.
        </p>
      </section>
      <section>
        <h2 className={c.h2}>No guarantee of outcomes</h2>
        <p className={c.p}>
          Compliance World does not guarantee specific results, timelines, or approvals from any authority. Processing
          times and decisions depend on third parties, completeness of your documents, and factors outside our control.
        </p>
      </section>
      <section>
        <h2 className={c.h2}>Third-party content and links</h2>
        <p className={c.p}>
          References to government sites, forms, or external links are provided for convenience. We do not control and are
          not responsible for the content, availability, or policies of third-party websites.
        </p>
      </section>
      <section>
        <h2 className={c.h2}>Use at your own risk</h2>
        <p className={c.p}>
          Your use of this website and any reliance on its content is at your own risk. To the extent permitted by law,
          Compliance World disclaims all warranties, express or implied, regarding accuracy, completeness, or fitness for
          a particular purpose.
        </p>
      </section>
      <section>
        <h2 className={c.h2}>Professional engagement</h2>
        <p className={c.p}>
          A formal client relationship and scope of work are established through separate communication, quotation, or
          engagement terms, not merely by browsing this site or submitting a contact form.
        </p>
      </section>
      <section>
        <h2 className={c.h2}>Contact</h2>
        <p className={c.p}>
          For clarifications:{' '}
          <a
            href="mailto:info@complianceworld.in"
            className="font-medium text-indigo-600 underline decoration-indigo-600/30 underline-offset-2 hover:text-indigo-500 dark:text-cyan-300 dark:decoration-cyan-300/30 dark:hover:text-cyan-200"
          >
            info@complianceworld.in
          </a>
        </p>
      </section>
    </LegalPageLayout>
  )
}

export default Disclaimer
