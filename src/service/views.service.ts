import prisma from "../../prisma/prisma";

export const getViews = async (user_id: string, chat_id: string) => {
  const views = await prisma.views.upsert({
    where: {
      user_id_chat_id: {
        user_id,
        chat_id,
      },
    },
    update: {},
    create: {
      user_id,
      chat_id,
    },
  });

  return views;
};
