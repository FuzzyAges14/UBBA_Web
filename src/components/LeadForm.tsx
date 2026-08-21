import { NEXTKICK_TRIAL_FORM } from '../data/contact'
import { SITE } from '../data/site'
import TrialCta from './TrialCta'

export default function LeadForm() {
  return (
    <div className="leadform">
      <div className="leadform__head">
        <span className="eyebrow">Free Class Request</span>
      </div>
      <p className="form-instructions">
        Continue on the academy&apos;s NextKick trial form to reserve your free class.
        No experience required — beginners are welcome.
      </p>
      <div className="leadform__steps" aria-hidden="true">
        <i className="on" />
        <i className="on" />
        <i className="on" />
      </div>
      <TrialCta className="btn btn--lg btn--block" arrow>
        {SITE.primaryCta}{' '}
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      </TrialCta>
      <p className="form-reassure">
        No experience required · Beginners welcome · No obligation — you&apos;ll finish
        on the NextKick form for {NEXTKICK_TRIAL_FORM.club}.
      </p>
      <p className="form-portal-fallback">
        <a href={NEXTKICK_TRIAL_FORM.href} target="_blank" rel="noreferrer">
          Open the trial form in a new tab
        </a>
      </p>
    </div>
  )
}
