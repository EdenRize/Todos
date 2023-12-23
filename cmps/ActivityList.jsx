import { utilService } from '../services/util.service.js'

export function ActivityList({ activities }) {
  return (
    <section className="activity-list">
      <h2>Activities:</h2>
      <ul className="clean-list">
        {activities.map((act) => {
          return (
            <li className="activity" key={act.at}>
              {`${utilService.getFormattedTime(act.at)}: ${act.txt}`}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
