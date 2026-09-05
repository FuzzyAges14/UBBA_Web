import { getNextKickForm, getNextKickFormHref } from '../data/contact'
import { SITE } from '../data/site'
import TrialCta from './TrialCta'

const trialConfig = getNextKickForm('trial')
const trialFallbackHref = getNextKickFormHref('trial', 'allendale')

export default function LeadForm() {
  return (
    <div className="leadform">
      <div className="leadform__head">
        <span className="eyebrow">{trialConfig.eyebrow}</span>
      </div>
      <p className="form-instructions">
        Choose your school, then finish on the academy&apos;s NextKick trial form to
        reserve your free class. No experience required — beginners are welcome.
      </p>
      <div className="leadform__steps" aria-hidden="true">
        <i className="on" />
        <i className="on" />
        <i className="on" />
      </div>
      <TrialCta kind="trial" className="btn btn--lg btn--block" arrow>
        {SITE.primaryCta}{' '}
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      </TrialCta>
      <p className="form-reassure">
        No experience required · Beginners welcome · No obligation — pick Allendale,
        Midland Park, or Glen Rock, then complete the NextKick form for that school.
      </p>
      <p className="form-portal-fallback">
        <a href={trialFallbackHref} target="_blank" rel="noreferrer">
          Open the Allendale trial form in a new tab
        </a>
      </p>
    </div>
  )
}
