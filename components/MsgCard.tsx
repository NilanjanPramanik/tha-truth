const MsgCard = ({ text, time }: { text: string, time: Date }) => {
  const date = new Date(time)
  const msgDate = `${date.getDate() < 10 ? 0 : ''}${new Date(time).getDate()}/${new Date(time).getMonth()}/${new Date(time).getFullYear()}`

  const formatTime = (): string => {
    const date = new Date(time)
    let ampm = 'AM';

    const hours = date.getHours() % 12

    let minutes: number | string = date.getMinutes()

    if (minutes < 10) {
      minutes = '0' + minutes
    }

    if (date.getHours() > 12) {
      ampm = 'PM'
    }

    return `${hours} : ${minutes} ${ampm}`
  }

  const msgTime = formatTime()


  return (
    <div className="border pt-3 px-3 rounded bg-zinc-900 border-zinc-700 flex justify-between flex-col w-[310px]">
      <p>
        {text}
      </p>
      <div className="text-zinc-700 text-sm flex gap-4 items-end justify-end">
        <p>{msgTime}</p>
        <p>{msgDate}</p>
      </div>
    </div>
  )
}

export default MsgCard