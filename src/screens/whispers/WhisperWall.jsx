import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Mira from '../../components/mira/Mira'
import Flower from '../../components/flower/Flower'
import styles from './WhisperWall.module.css'
import allWhispers from '../../data/whispers.json'
import {
  MIRA_DAILY_AFFIRMATIONS,
  MIRA_LETTER,
  SEEDED_WINDING_DOWN,
  SEEDED_COURAGE,
} from '../../data/miraCopy'

const REACTIONS = [
  { type: 'heart', emoji: '❤️' },
  { type: 'hug',   emoji: '🤗' },
  { type: 'spark', emoji: '✨' },
]

const AVATAR_COLORS = [
  '#F4C0D1', '#C4B0E8', '#A8D8C4', '#F4D4A0',
  '#C8D8F0', '#F0B8C8', '#B8D4B8', '#E8C8F0',
]

function avatarColor(username) {
  let hash = 0
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function avatarInitial(username) {
  return username.replace('@', '').charAt(0).toUpperCase()
}

function fmtCount(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function fmtDate(daysAgo) {
  if (daysAgo < 1) return 'today'
  if (daysAgo === 1) return '1d'
  if (daysAgo < 7) return `${daysAgo}d`
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)}w`
  return `${Math.floor(daysAgo / 30)}mo`
}

function WhisperCard({ whisper, myReactions, onReact, onContribute }) {
  const [showReplies, setShowReplies] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
  const [draft, setDraft] = useState('')
  const color = avatarColor(whisper.username)
  const initial = avatarInitial(whisper.username)

  function handleSend() {
    if (draft.trim().length < 3) return
    onContribute(draft.trim())
    setDraft('')
    setShowCompose(false)
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatar} style={{ background: color }}>{initial}</div>
        <div className={styles.meta}>
          <span className={styles.username}>{whisper.username}</span>
          <span className={styles.metaSub}>{whisper.age} · {whisper.location}</span>
        </div>
        <span className={styles.date}>{fmtDate(whisper.daysAgo)}</span>
      </div>

      <p className={styles.body}>"{whisper.text}"</p>

      <div className={styles.footer}>
        <div className={styles.reactions}>
          {REACTIONS.map(({ type, emoji }) => {
            const reacted = myReactions.includes(type)
            const count = whisper.reactions[type] + (reacted ? 1 : 0)
            return (
              <button
                key={type}
                className={`${styles.reactBtn} ${reacted ? styles.reacted : ''}`}
                onClick={() => onReact(whisper.id, type)}
              >
                <span>{emoji}</span>
                <span className={styles.reactCount}>{fmtCount(count)}</span>
              </button>
            )
          })}
        </div>
        {whisper.replies?.length > 0 && (
          <button className={styles.replyBtn} onClick={() => setShowReplies(v => !v)}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 1h11v8H4l-3 3V1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            {whisper.replies.length}
          </button>
        )}
      </div>

      {showReplies && (
        <div className={styles.thread}>
          {whisper.replies.map(r => (
            <div key={r.id} className={styles.reply}>
              <div className={styles.replyAvatar} style={{ background: avatarColor(r.username) }}>
                {avatarInitial(r.username)}
              </div>
              <div className={styles.replyContent}>
                <div className={styles.replyHeader}>
                  <span className={styles.replyUsername}>{r.username}</span>
                  <span className={styles.replyMeta}>{r.age} · {r.location}</span>
                </div>
                <p className={styles.replyText}>{r.text}</p>
              </div>
            </div>
          ))}
          {!showCompose && (
            <button className={styles.addReply} onClick={() => setShowCompose(true)}>+ Add yours</button>
          )}
        </div>
      )}

      {showCompose && (
        <div className={styles.inlineCompose}>
          <textarea
            className={styles.composeInput}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Share something gentle..."
            maxLength={200}
            rows={2}
            autoFocus
          />
          <div className={styles.composeBtns}>
            <button className={styles.cancelBtn} onClick={() => { setShowCompose(false); setDraft('') }}>Cancel</button>
            <button className={styles.sendBtn} onClick={handleSend} disabled={draft.trim().length < 3}>Share</button>
          </div>
        </div>
      )}
    </article>
  )
}

// Mira's affirmation card (days 1–13)
function MiraAffirmationCard({ dayCount }) {
  const affirmation = MIRA_DAILY_AFFIRMATIONS[(dayCount - 1) % MIRA_DAILY_AFFIRMATIONS.length]
  return (
    <div className={styles.miraCard}>
      <div className={styles.miraCardAvatar}>
        <Mira state="default" size={40} />
      </div>
      <div className={styles.miraCardBody}>
        <span className={styles.miraCardLabel}>Mira</span>
        <p className={styles.miraCardText}>{affirmation}</p>
      </div>
    </div>
  )
}

// Day 7 letter card (pinned in feed after seen)
function LetterCard({ flowerType, currentWeekFlower }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.letterCard} onClick={() => setOpen(v => !v)}>
      <div className={styles.letterCardTop}>
        <div className={styles.letterFlower}>
          <Flower type={currentWeekFlower || flowerType || 'rose'} waterCount={4} size={40} />
        </div>
        <div>
          <p className={styles.letterCardTitle}>A letter from Mira</p>
          <p className={styles.letterCardSub}>Week 1 · Your first bloom</p>
        </div>
        <span className={styles.letterChevron}>{open ? '↑' : '↓'}</span>
      </div>
      {open && (
        <div className={styles.letterCardBody}>
          {MIRA_LETTER.paragraphs.map((para, i) => (
            <p key={i} className={styles.letterPara}>{para}</p>
          ))}
          <p className={styles.letterSign}>{MIRA_LETTER.sign}</p>
        </div>
      )}
    </div>
  )
}

// Section label divider
function SectionLabel({ label }) {
  return <p className={styles.sectionLabel}>{label}</p>
}

export default function WhisperWall() {
  const {
    dayCount, whisperReactions, toggleWhisperReaction,
    contributeWhisper, whispersContributed,
    letterSeenDay7, flowerType, currentWeekFlower,
  } = useApp()
  const [showCompose, setShowCompose] = useState(false)
  const [draft, setDraft] = useState('')

  function handlePost() {
    if (draft.trim().length < 5) return
    contributeWhisper(draft.trim())
    setDraft('')
    setShowCompose(false)
  }

  // Community whispers from whispers.json (seeded pool, gated day 14+)
  const communityPool = dayCount >= 21
    ? allWhispers
    : allWhispers.filter(w => w.stage === 'early' || w.stage === 'mid')

  // Deterministic shuffle for community whispers
  const communityFeed = (() => {
    const arr = [...communityPool]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (dayCount * 31 + i * 17) % (i + 1)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  })()

  return (
    <Layout>
      <PageHeader showBack={false} />

      {/* Channel bar */}
      <div className={styles.channelBar}>
        <div className={styles.channelInfo}>
          <h1 className={styles.channelName}>Whispers</h1>
          <p className={styles.channelSub}>
            {dayCount < 14
              ? 'A quiet space with Mira'
              : `Women sharing their journey · ${(2841 + dayCount * 7).toLocaleString()} members`}
          </p>
        </div>
        {dayCount >= 14 && (
          <button className={styles.postBtn} onClick={() => setShowCompose(v => !v)}>
            {showCompose ? 'Cancel' : '+ Whisper'}
          </button>
        )}
      </div>

      {/* Compose */}
      {showCompose && (
        <div className={styles.compose}>
          <textarea
            className={styles.composeInput}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Something true, gentle, or brave..."
            maxLength={200}
            rows={3}
            autoFocus
          />
          <div className={styles.composeFooter}>
            <span className={styles.charCount}>{draft.length}/200</span>
            <button className={styles.sendBtn} onClick={handlePost} disabled={draft.trim().length < 5}>
              Share whisper
            </button>
          </div>
        </div>
      )}

      <div className={styles.feed}>

        {/* ── Days 1–13: Mira affirmation + past days ── */}
        <MiraAffirmationCard dayCount={dayCount} />

        {/* ── Day 7+: letter card ── */}
        {dayCount >= 7 && letterSeenDay7 && (
          <LetterCard flowerType={flowerType} currentWeekFlower={currentWeekFlower} />
        )}

        {/* ── Day 7–13: gentle note about what's coming ── */}
        {dayCount >= 7 && dayCount < 14 && (
          <div className={styles.comingCard}>
            <p className={styles.comingText}>
              Other women will start sharing soon. Keep showing up.
            </p>
          </div>
        )}

        {/* ── Day 21+: screening courage stories ── */}
        {dayCount >= 21 && (
          <>
            <SectionLabel label="Finding courage" />
            {SEEDED_COURAGE.map(w => (
              <WhisperCard
                key={w.id}
                whisper={w}
                myReactions={whisperReactions?.[w.id] || []}
                onReact={toggleWhisperReaction}
                onContribute={contributeWhisper}
              />
            ))}
          </>
        )}

        {/* ── Day 14+: winding down stories ── */}
        {dayCount >= 14 && (
          <>
            <SectionLabel label="Making time for yourself" />
            {SEEDED_WINDING_DOWN.map(w => (
              <WhisperCard
                key={w.id}
                whisper={w}
                myReactions={whisperReactions?.[w.id] || []}
                onReact={toggleWhisperReaction}
                onContribute={contributeWhisper}
              />
            ))}
          </>
        )}

        {/* ── Day 14+: general community whispers ── */}
        {dayCount >= 14 && communityFeed.length > 0 && (
          <>
            <SectionLabel label="From the community" />
            {communityFeed.map(w => (
              <WhisperCard
                key={w.id}
                whisper={w}
                myReactions={whisperReactions?.[w.id] || []}
                onReact={toggleWhisperReaction}
                onContribute={contributeWhisper}
              />
            ))}
          </>
        )}

        {/* ── User-contributed whispers (day 14+) ── */}
        {dayCount >= 14 && (whispersContributed || []).length > 0 && (
          <>
            <SectionLabel label="Your whispers" />
            {(whispersContributed || []).map((text, i) => (
              <div key={i} className={styles.ownWhisper}>
                <p className={styles.ownWhisperText}>"{text}"</p>
              </div>
            ))}
          </>
        )}

      </div>
    </Layout>
  )
}
