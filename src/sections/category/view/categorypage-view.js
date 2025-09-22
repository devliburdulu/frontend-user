"use client";

import { _mock } from "../../../_mock";

import MainLayout from "src/layouts/main";
import Banner from "src/sections/reuseable/banner";
import Container from "@mui/material/Container";
import HomepageCategory from "src/sections/homepage/homepage-category";

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));

export default function CategoryView() {
  return (
    <MainLayout>
      <Container sx={{ mt: 5, mb: 10 }}>
        <Banner data={_carouselsExample} />
        <HomepageCategory />
      </Container>
    </MainLayout>
  );
}
