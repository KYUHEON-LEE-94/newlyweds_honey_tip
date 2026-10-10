import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {filterArticles} from '../lib/filter.ts';
const articles=JSON.parse(fs.readFileSync(new URL('../data/policies.json',import.meta.url)));
const base={category:'전체',region:'전체 지역',includeNational:true,hideClosed:false,query:'',onlySaved:false,saved:[]};
test('지역 선택은 다른 지자체 사업을 제외하고 전국 공통을 포함한다',()=>{
 const result=filterArticles(articles,{...base,region:'서울'});
 assert.deepEqual(result.map(a=>a.id),['seoul-rent-interest','happy-housing-guide','jeonse-guarantee-fee']);
});
test('전국 공통 포함 해제는 선택 지역만 남긴다',()=>{
 assert.deepEqual(filterArticles(articles,{...base,region:'부산',includeNational:false}).map(a=>a.id),['busan-rent-interest']);
});
test('종료 숨김과 검색, 지역 필터를 함께 적용한다',()=>{
 assert.equal(filterArticles(articles,{...base,region:'인천',query:'천원',hideClosed:true}).length,0);
 assert.equal(filterArticles(articles,{...base,region:'인천',query:'천원',hideClosed:false}).length,1);
});
test('여러 검색어는 순서와 영문 대소문자에 관계없이 모두 일치해야 한다',()=>{
 assert.equal(filterArticles(articles,{...base,query:'hug 보증료'}).length,1);
 assert.equal(filterArticles(articles,{...base,query:'hug 서울'}).length,0);
});
test('저장 목록과 전국 전용 필터를 동시에 적용한다',()=>{
 assert.deepEqual(filterArticles(articles,{...base,onlySaved:true,saved:['seoul-rent-interest','happy-housing-guide'],region:'전국'}).map(a=>a.id),['happy-housing-guide']);
});
