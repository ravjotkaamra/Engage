// connect to the firestore messages between two friends or
// if it is a meeting chat connect to that
// or it could be that its home page so no need to connect (for chatbox main content)
export const getFirestoreConnectMessageObj = (currMeetId, currTeamId) => {
  if (currMeetId) {
    return {
      collection: 'teams',
      doc: currTeamId,
      subcollections: [
        {
          collection: 'meetings',
          doc: currMeetId,
          subcollections: [{ collection: 'messages', orderBy: 'sentAt' }],
        },
      ],
      storeAs: 'messages',
    };
  } else if (currTeamId) {
    return {
      collection: 'teams',
      doc: currTeamId,
      subcollections: [{ collection: 'messages', orderBy: 'sentAt' }],
      storeAs: 'messages',
    };
  }
};

export const getFriendChatHistory = (
  currTeam,
  myTeams,
  loggedInUser,
  users
) => {
  return myTeams
    .filter((team) => team?.isPrivate === true)
    .map((team) => {
      console.log('team :>> ', team);
      let { sentAt = '', sentBy = '', text = '' } = team.recentMessage;
      // if recent message is there, then
      // get date from seconds and nanoseconds
      if (sentAt) {
        const fireBaseTime = new Date(
          sentAt.seconds * 1000 + sentAt.nanoseconds / 1000000
        );
        sentAt = `${fireBaseTime.toDateString()} ${fireBaseTime.toLocaleTimeString()}`;
        text = `${sentBy.displayName.substr(
          0,
          sentBy.displayName.indexOf(' ')
        )}: ${text}`;
      }

      // get the user id of the friend
      const friendId = team.members.find(
        (memberId) => memberId !== loggedInUser.uid
      );
      // get the friend details from the firestore 'users'collection
      console.log('users :>> ', users);
      const friend = users?.find((user) => user.id === friendId);
      console.log('friend :>> ', friend);

      return {
        photoURL: friend?.avatarURL || friend?.photoURL,
        chatSender: friend?.displayName,
        chatText: text,
        chatURL: `/chat/${team.id}`,
        sentAt,
        key: team.id,
        highlight: team.id === currTeam.id,
      };
    });
};

export const getChatRowsForSidebar = (friendsChatHistory, meetsChatHistory) => {
  return [...friendsChatHistory, ...meetsChatHistory].sort((chat_1, chat_2) =>
    chat_2.sentAt?.localeCompare(chat_1.sentAt)
  );
};

export const getFriendInPrivateChat = (currTeam, loggedInUser, users) => {
  // get the user id of the friend in the current chat
  const friendId = currTeam.members.find(
    (memberId) => memberId !== loggedInUser.uid
  );
  // get the friend details from the firestore 'users' collection
  const friend = users?.find((user) => user.id === friendId);
  console.log('friend current:>> ', friend);
  return friend;
};

export const getMeetsChatHistory = (orderedData, currMeetId) => {
  // get all the meetings which the logged in user is part of (for sidebar)
  const meetings = Object.entries(orderedData)
    ?.filter(([key, val]) => key.startsWith('meetings') && val.length !== 0)
    ?.map(([key, val]) => val)
    ?.reduce((flatten, arr) => [...flatten, ...arr], []);

  console.log('meetings  subcolections :>> ', meetings);
  return meetings?.map((meet) => {
    console.log('meet chat room :>> ', meet);
    let { sentAt = '', sentBy = '', text = '' } = meet.recentMessage;

    // get sent date and time of message
    if (sentAt) {
      const fireBaseTime = new Date(
        sentAt.seconds * 1000 + sentAt.nanoseconds / 1000000
      );
      sentAt = `${fireBaseTime.toDateString()} ${fireBaseTime.toLocaleTimeString()}`;
      text = `${sentBy.displayName.substr(
        0,
        sentBy.displayName.indexOf(' ')
      )}: ${text}`;
    }

    return {
      photoURL: 'https://image.flaticon.com/icons/png/512/3214/3214781.png',
      chatSender: meet.name,
      chatText: text,
      chatURL: `/chat/${meet.teamId}/meet/${meet.id}`,
      sentAt,
      key: meet.id,
      highlight: meet.id === currMeetId,
    };
  });
};
