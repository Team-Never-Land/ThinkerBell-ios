export const dummyDepartment = {
  campuses: [
    {
      id: 1,
      name: "인문캠퍼스 교학팀",
      subCategories: [
        {
          id: 101,
          name: "인문대학",
          departments: [
            {
              id: 1001,
              name: "국어국문학과",
              phone: "02-1234-5678",
            },
            {
              id: 1002,
              name: "영어영문학과",
              phone: "02-8765-4321",
            },
            // 다른 학과들 추가 가능
          ],
        },
        {
          id: 102,
          name: "사회과학대학",
          departments: [
            {
              id: 2001,
              name: "정치외교학과",
              phone: "02-1111-2222",
            },
            {
              id: 2002,
              name: "행정학과",
              phone: "02-2222-3333",
            },
            // 다른 학과들 추가 가능
          ],
        },
        {
          id: 103,
          name: "경영대학",
          departments: [
            {
              id: 3001,
              name: "경영학과",
              phone: "02-3333-4444",
            },
            {
              id: 3002,
              name: "회계학과",
              phone: "02-4444-5555",
            },
            // 다른 학과들 추가 가능
          ],
        },
        {
          id: 104,
          name: "법과대학",
          departments: [
            {
              id: 4001,
              name: "법학과",
              phone: "02-5555-6666",
            },
            {
              id: 4002,
              name: "국제법학과",
              phone: "02-6666-7777",
            },
            // 다른 학과들 추가 가능
          ],
        },
      ],
    },
    {
      id: 2,
      name: "자연캠퍼스 교학팀",
      subCategories: [
        {
          id: 201,
          name: "자연과학대학",
          departments: [
            {
              id: 5001,
              name: "화학과",
              phone: "031-1234-5678",
            },
            {
              id: 5002,
              name: "생명과학과",
              phone: "031-8765-4321",
            },
          ],
        },
        {
          id: 202,
          name: "공과대학",
          departments: [
            {
              id: 6001,
              name: "기계공학과",
              phone: "031-2222-3333",
            },
            {
              id: 6002,
              name: "전기전자공학과",
              phone: "031-3333-4444",
            },
          ],
        },
      ],
    },
  ],
};
