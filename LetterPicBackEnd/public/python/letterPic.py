# -*- coding:utf-8 -*-
from PIL import Image
import sys

IMG = sys.argv[1]
#IMG = "pic.png"

WIDTH = 180
HEIGHT = 100

ascii_char = list(
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ")

# 将256灰度映射到70个字符上


def get_char(r, g, b, alpha=256):  # alpha透明度
    if alpha == 0:
        return ' '
    length = len(ascii_char)
    gray = int(0.2126*r+0.7152*g+0.0722*b)  # 计算灰度
    unit = (256.0+1)/length
    return ascii_char[int(gray/unit)]  # 不同的灰度对应着不同的字符
    # 通过灰度来区分色块


if __name__ == '__main__':
    #print(IMG)
    rgb_im = Image.open(IMG)
    im = rgb_im.convert('RGB')

    WIDTH = im.width
    HEIGHT = im.height
    #print(WIDTH,HEIGHT)
    im = im.resize((int(WIDTH/3.44), int(HEIGHT/8)), Image.NEAREST)
    txt = ""
    for i in range(int(HEIGHT/8)):
        for j in range(int(WIDTH/3.44)):
            txt += get_char(*im.getpixel((j, i)))
        txt += '\n'

    # 写入文件
    with open("./public/python/output.txt", 'w') as f:
        f.write(txt)
