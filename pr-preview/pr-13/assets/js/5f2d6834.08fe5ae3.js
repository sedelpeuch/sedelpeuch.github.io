"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[2207],{13429:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>o,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var s=i(74848),t=i(28453);const r={title:"Bus de communication"},l=void 0,a={id:"enseirb/s9/SE/2",title:"Bus de communication",description:"Les bus de communication standard sont n\xe9s de la n\xe9cessit\xe9 de faire communiquer ensemble MCU et IC, nous allons pendant ce cours en pr\xe9senter quelques-uns.",source:"@site/docs/enseirb/s9/SE/2.md",sourceDirName:"enseirb/s9/SE",slug:"/enseirb/s9/SE/2",permalink:"/pr-preview/pr-13/docs/enseirb/s9/SE/2",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Bus de communication"},sidebar:"tutorialSidebar",previous:{title:"Architecture",permalink:"/pr-preview/pr-13/docs/enseirb/s9/SE/1"},next:{title:"Interruptions et ordonnancement",permalink:"/pr-preview/pr-13/docs/enseirb/s9/SE/3"}},u={},c=[{value:"UART",id:"uart",level:2},{value:"I2C / TWI",id:"i2c--twi",level:2},{value:"SPI",id:"spi",level:3}];function A(e){const n={h2:"h2",h3:"h3",img:"img",li:"li",p:"p",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"Les bus de communication standard sont n\xe9s de la n\xe9cessit\xe9 de faire communiquer ensemble MCU et IC, nous allons pendant ce cours en pr\xe9senter quelques-uns."}),"\n",(0,s.jsx)(n.p,{children:"Avant de parler des bus, voyons comment fonctionnent les lignes \xe9lectroniques physiques. Contrairement \xe0 la vision des informaticiens, une ligne \xe9lectronique n'est pas seulement un 0 ou un 1 mais elle est \xe0 un niveau de tension donn\xe9 et une certainne imp\xe9dance. Une ligne peut \xeatre pilot\xe9e \xe0 basse imp\xe9dance en utilisant des transistors push/pull"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:i(31930).A+"",width:"308",height:"360"})}),"\n",(0,s.jsx)(n.p,{children:"Symboliquement, cela peut \xeatre repr\xe9sent\xe9 avec un triangle et appel\xe9 un controller de ligne"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:i(96035).A+"",width:"534",height:"112"})}),"\n",(0,s.jsx)(n.p,{children:"Lorsqu'une ligne est une entr\xe9e en haute imp\xe9dance et que rien n'est branch\xe9 (la ligne est flottante), n'importe quelle tension peut \xeatre lue \xe0 cause de toutes les interf\xe9rences. Si l'on veut imposer un niveau logique par d\xe9faut il est n\xe9cessaire d'utiliser les r\xe9sistances dites pull-up/down."}),"\n",(0,s.jsx)(n.h2,{id:"uart",children:"UART"}),"\n",(0,s.jsx)(n.p,{children:"UART, souvent appel\xe9 \"s\xe9rie\" est l'un des bus de communication les plus connus, c'est une bus asynchrone ce qui implique qu'il existe une fr\xe9quence de communication appel\xe9e baudrate. Les bytes sont transmis bit par bit et sont pr\xe9c\xe9d\xe9s et suivis de bits de d\xe9but et des bits de fin ce qui permet de conserver la synchronisation entre les messages."}),"\n",(0,s.jsx)(n.h2,{id:"i2c--twi",children:"I2C / TWI"}),"\n",(0,s.jsx)(n.p,{children:"I2C (Inter-Integrated Circuit), ou TWI (Two Wire Interface) est un type de bus qui utilise deux fils, il est synchrone et semi-duplex. Ces lignes sont port\xe9es ) un niveau de tension \xe9l\xe9v\xe9es et pilot\xe9es par des drains ouverts."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:i(19788).A+"",width:"666",height:"294"})}),"\n",(0,s.jsx)(n.p,{children:"I2C est bas\xe9 sur un protocole avec adresse, arbitrage et accus\xe9s de r\xe9ception. Si plusieurs ma\xeetres commencent une trame simultan\xe9ment, l'arbitrage est mis en \u0153uvre en surveillant le niveau de la ligne (si LOW est lu lorsque le drain ouvert est ouvert, la trame est arr\xeat\xe9e en raison d'une collision). Ainsi, les adresses avec le plus de 0 dans la partie haute ont plus de priorit\xe9 dans l'arbitrage."}),"\n",(0,s.jsx)(n.h3,{id:"spi",children:"SPI"}),"\n",(0,s.jsx)(n.p,{children:"SPI (Serial Peripheral Interface) est un bus synchrone et full-duplex. Sur un bus SPI, il y a un ma\xeetre et plusieurs esclases. Il utilise 4 lignes :"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"SCK : l'horloge indiquant quand les bis sont transmis"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"MOSI et MISO : respectivement sortie ma\xeetre / entr\xe9e esclave et entr\xe9e ma\xeetre / sortie esclave"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"CS : indiquant \xe0 un esclave s'il est activ\xe9"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:i(72053).A+"",width:"556",height:"427"})}),"\n"]}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(A,{...e})}):A(e)}},31930:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/2-4d546a70c5aacc1d616d1ff5d3ca75e6.png"},96035:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/3-483d01b5518e81261b21dcc7079af094.png"},19788:(e,n,i)=>{i.d(n,{A:()=>s});const s="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApoAAAEmCAQAAABo5fjnAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQffCQgQIAUe0D2ZAAAdnElEQVR42u3deWBU1aHH8e+dhH0VAdlEFAsqoqhVnxIXLAqC9uFTkK0V0QRRXJ+1xRZB27q0z31NAoILVAOvtGgRMCICLiC4w8PWDcWKgiwaYghJzvsjlyEzWch1zsyZmfw+84dzlzn3nHOZnzf33rkHRERERERERERERERERCQpLeClKlNHYjiHWRgMe/iGpVxBJkCN80REGpz/pIIe4an/4TNCzGI1R3AUpzOVHSynKdQ4T0SkwcnkK2713zfia24BZrEsvLwfe7iplnkiElDIdQUkZmU8wTh/T55Pe2ZGLX+HRVxYj3kiUg86s5Xsfs69tSwZwof+uxn8moEsAS5jCV9UW3MdJ9drnojsl0Iz2bXksFqWNA6/+xevMJ4ldGEQI2tY08PUa56I7JdCM9ktoKf/7qc8yxouDi/ZVGWtGeTTjnFs4+81lNGHT+s1T0T2S6GZ7Ioo8t91AUr4pMa15vEgYxnPk+yptqwfg7i5HvNEpB4UmunhB+YwjQOYEZ7TnCMIcSADuIHXebDWeSIiaSoLw4palx6P4dXwVOWN7GVsYSkTaVTrPBGRtFV3aIpIQug+TRGRABSaIiIB6EKQe0fQrV7rHQ20ZWC9yy3iDddNExGxbw4mLq/3XDdMJB3pSNO9g4ENEbeqxy6THpS4bpiISDw8gmGi5TK7Y9joumEi6UgXgkREAlBoiogEoNAUEQlAoSkiEoBCU0QkAIWmiEgACk0RkQAUmiIiASg0RUQC8FxXoAHKjZrO4ihWsj5q7uoqT2Hfr7yFpnfV6eLQc22bVfx8R+Ra3oc5Q1w3XiTV6bfniZdTw7wssqLmtAwSmnTzIsasbFE5KGW7qLV2uW66SOpTaLoxoc6lJ3HZjyhzSOaHtS8s681C140WSQcKTTfy6lxa9GNC02wa/0ntS3Nb6EyMiA26ECQiEoBCU0QkAIWmiEgACk0RkQAUmiIiASg0RUQCUGiKiASg0BQRCUChKSISgEJTRCQAhaaISAAKTRGRABSaIiIBKDRFRALQo+HsmMUlgOFbCrmRL11Xp275s0y4tuU3Tkzy2ookFx1p2vImR9KXK8jiKddVqU9tjV/bjFSorUgS0ZGmLcVsANZxPFcBUMg/aUN/mjOTyVS4rl50bSdsANblHu9dBZBfyD9pY/rTnJn/njwt2WorkkR0pGmTR2/OY7U/dTnz6cGJjOC3ritWE+PN6O2Fa2suZ35Oj9CJjOiclLUVSRYKTVvOoIwyNvAlo/w5y5kHbOQOJrmuXPXa5pXll5Vv4MtSv7be8ux5cPlG7w4v+WorkkQUmrasoR8n8zCn0dGf857/33fpyEGuqxfJWxPqV3GyeZjTmvi1NX5tK96lY36S1VYkmeicpi27+ABYQ1/uZTCwr2+TsI/NruwPgDX5fU1UbTMydUJTpC460rTtdgbRD4BT/Tn92cLXrqtVM3M7g/Iialveny3ZSVpbkWSg0LRtMR/wKwB6cRvdOJfJPOy6UrXJWWw+8Pza5t+W3y3vXG+yl7S1FUkGCk377mEE3YHpdGIds5nOH1xXqXahe8yI3O7AdNPJrGM209skcW1F3EvC820paVyV9zOZCUApOeS4rlhNsqvUNnsmMyEfSnOStLYiyUVHmiIiASg0RUQC0J/n8TLQdQWCyE6p2oq4pCNNEZEAFJoiIgEoNEVEAlBoiogEoNAUEQlAoSkiEoBCU0QkAIWmiEgACk0RkQAUmiIiASg0RUQC0G/P3Sio8r4JmZSyp8qc7j+mSG9lXnkdizNcN1kkPSg03RgehzJbu26USEOg0Ey8EVHTl3MO01kSNffzIEWWZGVGHEl6R2WsZH1ZVuRaZeVByhQRSU6PYJhot8jcvnkm773YyxGRaLoQJCISgEJTRBKlM4/wKaXsYh2Pc7o/NwuDwVDB96xnFmdHfao1P2Dich3gR9E5TRFJjG6spjNrWIzH0fySxiwPL3uXN4BW9OYXXMICRlEcXnYRTYGxzHXdgEoKTRFJjMl05jru96c60KfKskJu9N/15HF+Ti6/CC8by3YKGUY7trluAujPcxFJlBOo4OHw1BaW1bjWxwzlU8bS15/uyhnM52kaVbvvxBGFpogkRjEhutRjvSIeBC7wp0YT4lkWs5OxrhtQSaEpIokxDyhkAr32u+ZK4Dj//Vi2spTd/I1TOdR1E0ChKSKJ8ih3cgiP8SFbmcuAOtb8CmgPwNEcw/9SBjyLxxjXTQCFpogkimEyXRnHY2ziIpZycz0+MxZ4FoBCtik0RaSh2coTTKQfp7CN33NYLWt1BrYCHqP5mlcA2MNfOYITXDdAoSkiLrxBLiFOq2XpacDbwBkczEGU+ze/Xw7JcDFI92mKiAul1HbQ1pJJwHxgDFDA9+ElwxjJjTh+8IxCU0QSYzIvsdp/341xEJ6q6jAe51Ce4n2acBFfMBITXlbEtfys2hPBEkyhKSKJMZTb+YQ32U5nzqY5eawLLxvIY0BLenM8IZ7jCuA82pJfJTLhL1zLWIWmiDQMOYziZwyiFTtZxSyeqrLsWI4Fivmcp5ntx+IYYE5ECav4mAtoXuV36Q4oNEUkMdYzhSk1zF+JV+P6/1XDvMNdN0JXz0VEAlFoiogEoNAUEQnA9jnNXNcNSkFZwGj62Szy3nY3sL1roL0xn0UR05dxUsT0jKjbQ5J9+a/ifvarlF1x3kLqKue7wJ/ZwuOuq+2G0SsZXl1Nnpka7DO/idqTs6OWj06x5Stc7wO9Ar5SZiBA20ea22jH5OR4vnLKGM0ZzPF/X2tJl67c0uZLbgvwkejbjGdE1SjVlv854oaWeGhMi/2s0Y+RvMMzca5HMsqgdaD1+zLEdZXd2Yihu+tKpBgN4ZuuRmOY7boSKaFvKh1p6kKQiEgACk0Rca0VUOS6EvWl0BQR10Lg+tlF9aefUYpI2sntHJpizqUre/jMrDKzrgiPsF6QsXOcGe0da1qzldcqpl+xCHKzvBXe3dk31q9shaaIpJn8bma16eytMYuN5x3t/dJrjB+aDx24YwGnssO8wjd0YEDowvxp2bcGK12hKSKuhYAKe8WZyXTmuuz7K6ce71Dex5/v5T/Dqd700uuvKgIoaLz9ai/w3T4KTRFxrRVUeT577E6g4t8P750Yv4Vlle9mnMdA76Xs7L1LRpRy95P7u9u2Gl0IEpF0U0yoc5fqsytGA3dFzvtl4B/DKjRFJN3MA68wd0Jer8jZ5iTKv18Za+EKTRFJM9mPendyiPcYH+ZvzZubO2DvfK8j22/4IdbSFZoi4loTKkentMQz2ZNNVzOOx8wmLvKW5t9ss7IKTRFxrSkQ8xFgpAlbJzyRMzGnn3cK28zvHz8MwHzDAfc0i7VkhaaIpLHsN8gltOc0AG81GS37x1qiQlNE0pophVBl0s0Gfh259OGWQctTaIpImsmbPD38XP/8bt44MKsBsv9BIQPz82e0qlz2QJPcmxr/MWjpurldRFxrAVYHDxlacXvuJ7zpbaezOZvmJm/COgDPPDSy8QJzefnw3OXeFtPBO502Fb+r/IgZnN8+/Pni7CtrL1yhKSKuZQJl9oqryAmNCv3MDKIVO1nlzcp+aoK/ZNK3087oeokZEzrVtPG28CK5Ewr9RX1Mn3ABO1FoikjDccV6pjBl33R2lWXTypjBjMj1J6zEq3/pOqcpIhKAQlNEXAtwnOee7cpupDuH8Hk8qpo71Hs+AT3SQHlzssdUnc79jXdHxPI7syen0vK8FWS57tOESfkR2Pc03dOsUUkjy7e31+i+nCBjtNYolc5papRLkZo0prHrKsSmEY2gKU3jvyUv5t8DpdaRZl/vPd7POSYeZTv1CBO5kkdtFpm2fZVaRjObOYyJvaDq8gzk+N/egsZbAz8TMrnccl3xLU3v+0PMx4B1y7ydK7zfZt8eczmJ6hYRiY8RpTYfduHED1BccuX2+G4kf4ehwsLz4XUhSERcawTsifdGTGM7W1FoiohrzYHieG/Ea2ZnKwpNEZEAFJoi0iBUtAKvKPZyFJoi0iCEQmDKLZTjuiEi0uA1x/qT22vQCDwLjwVRaIqIa42wOkZQzUxzMBZ+O6XQFBEJQKEpIg1DSwjpSFNEpJ4yoELnNEUkDbQGvov7VjJ19VxE0oMHmLhvpYXu0xQRSTiFpog0CKYF+u25iKSFTMDC2ca6eZnoKUcikhZaABbONu5HBoT0PE0RkXpqCRXfx16MQlNEJACFpog0DM3gAAuPBVFoiohrTYGSuG+lMYyw8FgQhaaIuNYE2B3fTRhrN9ArNEWkAciz9lNNhaaISAAKTRFpAELWzpsqNEXEtVbE/eb2CmvnTRWaIuJaiAT8jNJmZUVE0l0bYKeNghSaIiIBKDRFxLUQYOFRGnUxTbA04qVCU0RcawVYeJRGXbymWBpbXaEpIhKAQlNEGoBQaywdzSo0RaQBqPCwdN7Ubmh2pQlwcHwanRkCz4tP2Q5lcDhwlN1C07SvUk03oDPt41W8SZc9fBitgR7x3YhpBlgY9dxuaHZlKR2BAg613+SCjLI7wfTMu9J+2Q5l8ARnA1dykb1CCzLK7gDTM3eS6+Y1aH34LXAGL9qPzfypAPkPpEVsHsYy2gLzbB86VJXbPXQfcNb0w2Mvy15odmUpvSgDurDMdmwWZGyf7Q0GmvFQGsVmBk8whlIgxF9sxWZBxo6nvHOBZt4Dik1n+rCU1kAR/XiRA20WnT/VTANgUhrE5mEs42DKgA68TJ/4bCS3u7eMrkCripdjj01boVkZmW/xNfAm3e3GZkHG9tnexaYI+DekTWxWRuZ3/AN4gUw7sVmQseMpRu3tK8WmI31YSkfeBQrZQD8K7cVm/lQzzf/JYUnKx2ZlZK6gGCikI0vjEZu53b1lHMqnwFd0iz02bYVmbw7hLQZSAVzCSjrT116jt0/xLmYnE4BvzTXAQ3ln2CvdmQM4ke84l83Ac/yBTM6KvdAdv2UUO81E4FsmgfdA7gDXDW2AjqcDi7gXKOEsNtCTnnYKzh1uplHujQFgGCVMyp/ourEx6ERbVjAEA4xlEa3pYnsT0zK9FziUNyoeAp73ltOtfPEDTWIp0VZoLmUQA9kOwC6GMIQFFtt9r/eSN5j3ASY8ZK7xHstebrF0V7YygLN5zZ+awjCuir1Qcz8vMsR7FyDnESaRl7PMdUMboKcYyjB/jO2vOItzWG2n4K/m8wxjs58FyFnMMPOcmeW6sTF4jQEMoYgWwLcM40xetL2JaWXmel42g70yoKTiXAq966+J81Pi66s3PYGNGLrjca7lhocgt2+eyXtv71RaaMVpwCMYJgIDaWyj0DTtq1QzkMaMxjAb6MCJ9gqu3KN5Js8AFGS4bmiMBtERMBigDefHZyPGg9zf5Jn8O2zcc2DrK9WTl3nZ/xPEI5+F3GCvyQ936rL2scF7p/Kndnl2Wqa90p1pxkIKw/97Gc8S5sS+P/IP6rI2L/y/rNwpXQpyG7luaAM0kkX8lcp/pR1YyoucZKfg3OZdFuZdvXcqb8SOV2e2dd3YGJzDAv+eG2jDEuYz3P5GHhs8/dVHDqh8P6NV/kv5MV47sBWam/mIg3mZTOAuLqOYt+w1utGl9AvNN/3BPw1+QddT7JXuTAlracx8ugOnMh2P12O/+daMox/zyQLIneLdxjCTDn2VatazjaFcBzRhKUezic/sFOwN5Bzur4zNvBHM4eTSi103NgZv80/6sBSAJZzERt6wvYmCjNCfzCmZhaH2YMrKFzLA3FkQ09909q68teAFTqOcDKCYoSyz12zj5d/P1eymife1OYhyb0zlOZ2U53Ev11JOBgaPG7k79iKNl38v13qlpjFfcxDl3i+y/+K6mQ3SMRTSAdhJG9ZxFt/YKjh3ovcwld/ccjLMrROmuW5qTDqwlKP9959wJl/Y38SjXTOW0svbbDqZz7wefO6dmf1pLOXZvF2hMjbhB4byst1m+7EJpFFkwt7YBOxEJuyNTQBFplPHsILWGNbbjEzwY9MDSPnIBOjAKxyJ4VMG8Hl8NlEZmwB8njlg/CexlVY1NOeyLca6ZXI6e9gYn6YffXqTVpnNvnx708cxFtSO6/gy5uqcxcSY+6vSQNrwb163Upbv6NOatMls+tU7n39kobBtTLZZtxRwEr+ysm+P4mi+5TU7DySr6tCjOhxpyr7b9OHaGAv6getiqwjtLDSnE1Mp4S422+qf6vp2vDC30We7D11y1Rs/7ru/eV9mVA3N1YyMX6Vj18TbbZp4u2Mf7v1W/lR5+1JMruIA5rjuk9pY6yuAWZzuuj0JNpoTknffVmrk7bGxd3P5aUyfn803dgYrSwAPg8eP67VufLHv0KHqVehviPGwNb52Y2kwuU1WqlPBJ8nbX9b6CuA7161xYC2xHsPF2R47xcR+bDfNzrg7SS6LofsmdBefiEgACk0RkQAUmiIiASg0RUQCUGiKiASg0BQRCUChKSISgNvQ/AnT6O26C1KI+kvEObehmc/1TLf6+/f0pv5KR+dhGOa6EikiKfrKVmhmYTA8XGXOgZRiWFnHZ8ZxOMfRg/HARRjOc90ZCaT+Si+V+7Pqq63rKiWpNOgpmw/zLWc414ZHFh5OZp1Ph2zHXYzlE8bxDH933Q1OqL/Sy/9FPEO21HV1kliK95TN0CxkEGfzgj81mlc5ro61t3EQAC/RwXUnOKL+Si8LudF1FVJEiveUzXOar7KR0f77g8mKeE5Ma27lTYoo4X32DSq79wzFH5gLPIfBMAsYi2EgV7OBPWQDISbxDj+wg+fo57rL1F9STxnczIeUUsw67vfnhZjEWorZxSoui1q/DX8M7/Vr/HPX52OoOmT1Crb6hzrptZfj2VeWe8rmkabhGa6iOcXAKMqZy5/Dy3pxLUt5iQzO5EE6ckvEJ+fSimu4m3eAvU/L/G+yWMjrfAs8yRiW8AKtGM6rZPG2xVq7o/5Kd7dzE8t4BsORjPQfDP0XRvABD1LOSYxnRsT6P2EihSwmgwHcT0d+ByxmJ8N5xF+jC/2Z4Z/SeZLRvMBztOLiNNjL8eyrOPbU8zF8NgvD7+iL8Z/J+S7PA0XhCxstaR5e93GKaQNUvRYWeWFjLIYd/pOWK5eN8t8fxJcxD/J5h5Ux2SeGjxLTvb9i+XeRmkYH3rdZGD5gVvg1FYBN/ug3AC38kg1Ph/++aw9U3astaBpefwY/+Hv9Ccr9UzNwNYazgcq9PMKf24FNFP6olsa6b2f7dYy1p+LZVzZ6Kos79k3YveXofT5gNHAUx0Q9xLWIYqAJHejEP2hWj7H5cvmn/+4y/sWLtKc97Snnec60M9RtElB/pZM+XBJ+VQ5F26jK92sXAOPZzTXhC35bo0rYRQl79/pCmnIyAAWEuNBfYwRb/XC5jH+xnE50ohMZLOSMFNrL1Xsqnn1lvadsD4U7h2m0Ywy7ql3hHcVNHBPumM77LWlV+N1Pac+WiGUH8pXlerui/kofd1e7vLGAy3mduSzjbf+J4cfxbp0DaUTu9U4AvMgO/4/OLvQnn3Kgci9H7tXU2ct313AhKH59Zb2n7IfmHxnOKP7u/99iXwPnsIpr+ZxSjuSeemT9vueFt2VN1Cg1dsbmSQbqr3R2NVu4lLuBjfyKuUCb/cRATXu9lPlcwkF8zYV4FPjrtmUtv4v4dGrv5fj1lfWesh2aG3mNqXTm6qj51/IFp/t3ZAX9Rcv3tP6RZ2ySn/ornZVwMzdzBEO5gWf4hLXsrHMgstr2egGXciGPMIIt4aGxv6cli1w3MCX6ynpP2f8Z5Rw68y1LouYewv+Fb2I9rYZPlVN7OKylF0dYr2eyUH+luw3czSWEGAi8xbF1REFte72QbQynC/35q//HOayldxru5Xj0lfWesh+aT3MB51Ub92kz/WgFQG+uquFT29h7VqK6PCDPv6IGLcKnjtOD+itdZXBi+H0LYCcwkyY8EP7WRf9MYTPH1bjXy5jP6VxV5Y/zdNvL8ewr6z1l+89z+I6/1TB3Og+xir/SjjEsr+FX02+xi6kcSjHv8lzUsrnM5FI+5G98R08GsabaGqlM/ZUuBvu3xVT6PV+ymrd5la0czEg2MxeYwzDGcBwvUM4JNKN/RAm17/UCLuMmvuaV8JxU3svRPfUxjeLYV3Htqdjv04y2775Dj5v4gt1s4Br+A8PlQOQzS87nHXZH/MJlH49xvE4RpXzKk2TF2M7kuU8zNfpL92nuX/XHUPwHIW5hOdsoYzNP08NfM4PreI8SiniDcUDVvVrzXgfIZAsmfNs2/tqx72U392lG9xRx7qvYeyriPk2bHZgqkiE0U0lD+XexT/DQTFWJD83UFMeb20VE0pxCU0QkAIWmiEgACk0RkQAUmiIiASg0RUQCUGiKiASg0BQRCUChKSISgLvQPILXKOEVfuJPe1zLHD7GsMl1pySl6P7qxE0sZyclfMCvaeS6emKNvglJzlVoZrCATzmPzSwgw59zH6Oo4AfXXZKUqvfXNO6iF8v4O+25kwWBn7opyUrfhCRn/ylH9XMCHRjPbpbzFcexBijnXFazjY+qDJgke1Xvr3c5n4VUAC1YzGD+s8anJUnq0TchycX/SLPyCTw5bKCE9Vzgz21GMbuBUkr8cRcNi1L8gf121Le/HuV5f9CpXdwOnOK64lIPkXv3whrX0TehJvXpuQRJzJ/n13AHK5hJJ+b6Dxt9i5ZcTwuupxlrXXZAUgraX5VxKqlh394tqMcoo7JPkvRcYv48P5lj2QTks5YreBP4nkt4knvYwaioIcUkeH+NgJhHN5dEidy7q11XJ4UkSc8lJjQf9K8DvsV6jvPn/Y0uHMZHFLtqehIL1l8DuJxFLHddaamnB6rs3X6uK5NSkqTnEhOab4fffR1+KjMU8Z67hie1IP11JPP4gktdV1nq7Z3wu8q9247b/OnXmOO6ckntnfC7qt+LhEtMaO4Ov6vQ7fT1UP/+6sESyhnEZtdVlnqL3rutwwODNVVo1ilJcsTVLUdiQxdeojUD+NB1RSQGn+ke29Si0Exd7SmkM4N5y3VFRBoShWaqasNiDucCXQASSaxkCs2b6QV0JINZwKfc6rpCSe0+judjhjPcn17Fo66rJJbom5DUkik0h4SHg78EWKt/KnU6AOhJz/B0U4Vm2tA3IWU0lPGtNe55MA3l38U+Gve8vjTuuYiI1E2hKSISgEJTRCQAhaaISAAKTRGRABSaIiIBKDRFRAJQaIqIBFD1F0Enh3+Slwg/pS1r2OGgzedYeQBXI4azJ0E1bkoWJaxM0Nai9Yy9iJSTuH0bKdF7+ggnrbRnMN1ZxOeJ3WjV0LyVAxK45f/icHbyUWKbC8BMvrRQyktUJKy/2pHDNtYlaGvRpjjarjuraZfQ78I+id7Tt8T4+Q+Yl7C61qQf7XmHrQnY0jNO2+lbgSHLdSVSRHcMG11XQhJAezqY5zEMTfRGdU5TRCQAhaaISAAKTRGRABSaIiIBKDRFRAJQaIqIBKDQFBEJQKEpIhKAQlNEJACFpohIAApNEZEAFJoiIgEoNEVEAlBoiogEoNAUEQlAoSkiEoBCU0QkAIWmiEgACk0RkQAUmiIiASg0RUQCUGiKiASg0BQRCUChKSISQKazLWcAP+co1x2QEtoBLclxXY2wpXwUMX0R7SKm57EtpZZDS0YnvBdrkmx7Otl1Bzq7rkTiXIbRK0Vf0QHzXtTyvim2HLo771O9fuzr6kRHl7sjzfmc5GzbqaYloylijutqhH0UNT2P1yOmt6XYcigiLwH9JvGwynUFJBl1x7DRdSVEBHQhSEQkEIWmiEgACk0RkQAUmiIiASg0RUQCUGiKiASg0BQRCUChKSISgEJTRCQAhaaISAAKTRGRABSaIiIBKDRFRAJQaIqIBKDQFBEJQKEpIhKAQlNEJAB3w11IpL5MqnVZS6AdubUu/4g/u66+SEOh0EwWO1lb67IQ66ioYWSbvTa7rryIiIiIiIjExnNdAYkyqYZRuWv352rD6YpIXOmcZrL5iNIAaxe5rq6IiIiIiIjYoHOayekWuu5nDZ3NFHFC5zST0/r93nups5kiIiIiIiJpROc0k1v0XZtzeMV1lUQaNp3TTG7Rd21ucV0hERERERERERERERFJHf8PC2kXatItC2wAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDktMDhUMTg6MzE6NTIrMDI6MDBY+kJ/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA5LTA4VDE4OjMxOjUyKzAyOjAwKaf6wwAAAABJRU5ErkJggg=="},72053:(e,n,i)=>{i.d(n,{A:()=>s});const s=i.p+"assets/images/5-b33f2ef828ecb3ce3980c08058b7fa95.png"},28453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>a});var s=i(96540);const t={},r=s.createContext(t);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);