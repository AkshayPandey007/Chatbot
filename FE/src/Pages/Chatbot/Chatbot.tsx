import React, { useEffect, useRef, useState } from 'react'
import { userProfile } from '../../Redux/Features/Auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { red } from '@mui/material/colors'
import SendIcon from '@mui/icons-material/Send'
import { getAllChat, newchat } from '../../Redux/Features/Chat.Slice'
import ChatItem from './ChatItem'
import { RootState } from '../../Redux/Store'
import ChatDeleteDailog from './ChatDeleteDailog'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'


const examples = [
  'Tell me Fun Fact',
  'Can AI feel emotions like humans?',
  'Are we alone in the universe?',
  '"Will robots replace human jobs entirely?"',
  '"Is immortality within human reach?"',
  '"Can we control the weather effectively?"',
]

const Chatbot = ({open,setOpen}:{open:boolean,setOpen:Function}) => {
  const userEmail = localStorage.getItem('email')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const chatsData = useSelector((state: RootState) => state.chat)
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [chat, setChat] = useState<any>([])
  const [inputValue, setInputValue] = useState('')
  const userData = useSelector((state: RootState) => state.user)
  const [showScrollDown, setShowScrollDown] = useState<any>(false)
  const chatContainerRef = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
     
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 30
      setShowScrollDown(!isNearBottom)
    }

    const chatContainer = chatContainerRef.current
    chatContainer?.addEventListener('scroll', handleScroll)
    return () => chatContainer?.removeEventListener('scroll', handleScroll)
  }, [chatContainerRef?.current])

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current
    chatContainer.scrollTop = chatContainer.scrollHeight
  }
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string

    if (!content) return
    if (inputRef && inputRef.current) {
      inputRef.current.value = ''
    }

    const newMessage: any = { role: 'user', content }
    setChat((prev: any) => [...prev, newMessage])
    const chatData = await dispatch(
      newchat({ email: userEmail, message: content })
    ).then((res: any) => {
      setChat([...res?.payload?.chats])
    })
  }

  useEffect(() => {
    dispatch(userProfile({ email: userEmail }))
    dispatch(getAllChat({ email: userEmail })).then((res: any) => {
      setChat(res?.payload?.chats)
    })
  }, [dispatch, userEmail])

  useEffect(() => {
    if (chatsData?.isDeleted) {
      setChat([])
      setShowScrollDown(false);
    }
  }, [chatsData?.isDeleted])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleExampleClick = (example: string) => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = example
      setInputValue(example)
    }
  }



  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3
      }}
    >
      
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700
            }}
          >
            {userData?.profile?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            // onClick={handleDeleteChats}
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400
              }
            }}
            onClick={() => setOpen(true)}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '25px', sm: '35px', md: '40px' },
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: '600'
            
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        {chatsData?.isFetching ? (
          <div
            style={{
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '60vh',
              borderRadius: 3,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'scroll',
              overflowX: 'hidden',
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}
            ref={chatContainerRef}
          >
            {
          chat?.length > 0 ?
            chat?.map((item: any, index: number) => (
              //@ts-ignore
              <ChatItem content={item?.content} role={item?.role} key={index} />
            ))
          : 
          <Box className="exampleBox" sx={{ display: isLargeScreen ? 'grid' : 'unset', gridTemplateColumns: isLargeScreen ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)' }}>
          {examples.slice(0, isLargeScreen ? 6 : 4)?.map((item, index) => (
            <div className='exampleEachBox' style={{marginTop:isLargeScreen?'':'15px'}} key={index} onClick={() => handleExampleClick(item)}>{item}</div>
          ))}
        </Box>
          }
          </Box>
        )}
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
            position: 'relative'
          }}
        >
          {showScrollDown && (
            <IconButton
              onClick={scrollToBottom}
              sx={{
                color: 'black',
                position: 'absolute',
                top: '-50px',
                borderRadius: '50%',
                backgroundColor: 'white !important',
                right: '50%',
                transform: 'translateX(50%)'
              }}
            >
              <ArrowDownwardIcon />
            </IconButton>
          )}{' '}
          <input
            ref={inputRef}
            type='text'
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px'
            }}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
          />
          <IconButton
            sx={{ color: 'white', mx: 1 }}
            onClick={handleSubmit}
            disabled={!inputValue || chatsData?.isLoading || chatsData?.isFetching}
          >
            <SendIcon />
          </IconButton>
        </div>
      </Box>

      <ChatDeleteDailog open={open} setOpen={setOpen} />
    </Box>
  )
}

export default Chatbot
