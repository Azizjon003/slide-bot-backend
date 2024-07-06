import prisma from "../../prisma/prisma";

export const getViews = async (user_id: string, chat_id: string) => {
  let viewsFirst = await prisma.views.findFirst({
    where: {
      user_id,
      chat_id,
    },
  });
  if (!viewsFirst) {
    viewsFirst = await prisma.views.create({
      data: {
        user_id,
        chat_id,
      },
    });
  }

  return viewsFirst;
};
